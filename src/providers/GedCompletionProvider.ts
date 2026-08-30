import * as vscode from "vscode";
import * as json from "jsonc-parser";

import { ElementDefinition, ParameterDefinition, PropertyDefinition, PropertyKind, PropertyState, ValueType } from "../registry/ElementDefinitions";
import {
    allRootDefinitions,
    findDefinition,
    resolveAllowedChildren,
    resolveSupportedEnumValues,
    resolveSupportedParameters,
    resolveSupportedProperties,
} from "./DefinitionResolver";
import { describeVersionConstraint, VersionString } from "../Version";
import { getConfiguredVersion } from "../GedConfig";

const RESERVED_KEYS = ["type", "parameters", "children"] as const;

/**
 * A precomputed edit for a key that's already sitting inside a quoted
 * string (typically because typing `"` auto-closed the pair). `range`
 * covers just the interior of that string (excluding both quotes) and is
 * what gets replaced with the chosen key name. `insertAfter` is the
 * position right after the closing quote, where the ": <value>" scaffold
 * gets appended via additionalTextEdits — a *separate* edit, so it can
 * never collide with whatever quote characters already exist.
 */
interface KeyEdit {
    range: vscode.Range;
    insertAfter: vscode.Position;
}

/**
 * Context-aware completions for .ged files, driven by the same
 * TypeRegistry + version-resolution logic as GedValidator.
 *
 * Handles:
 *  - "type" value                -> allowed types at this position
 *  - a new/existing property key -> valid properties for THIS element
 *  - a "parameters" key          -> valid parameters for THIS element
 *  - a parameter's value         -> its enumValues, if any
 *  - an empty slot in "children" -> a snippet per allowed child type
 *
 * Context is resolved by walking the actual parsed AST via each node's
 * `.parent` link (the same object/property/array shape GedValidator.ts
 * already relies on) rather than jsonc-parser's getLocation() path array
 * — path-array shape for a not-yet-typed key is easy to get subtly wrong,
 * which previously caused completions to resolve against the wrong
 * (usually parent) element. Walking real node relationships removes that
 * ambiguity entirely.
 *
 * All replacements use explicit, AST-derived vscode.Range values rather
 * than relying on VS Code's default word-based replacement, to avoid
 * double/missing quotes when the editor's auto-closing-pairs feature has
 * already inserted a matching quote or brace.
 */
export class GedCompletionProvider
    implements vscode.CompletionItemProvider {

    public provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken,
        context: vscode.CompletionContext,
    ): vscode.ProviderResult<vscode.CompletionItem[]> {

        void context;

        if (token.isCancellationRequested) {
            return [];
        }

        const text = document.getText();
        const offset = document.offsetAt(position);

        const root = json.parseTree(text);

        if (!root) {
            return [];
        }

        const node = json.findNodeAtOffset(root, offset, true);

        if (!node) {
            return [];
        }

        const version = getConfiguredVersion();

        if (node.type === "string") {
            return this.completeStringPosition(node, version, document) ?? [];
        }

        if (node.type === "object") {
            return this.completeObjectPosition(node, version, document) ?? [];
        }

        if (node.type === "array") {
            return this.completeArrayPosition(node, version) ?? [];
        }

        return [];
    }

    //
    // Cursor is inside a quoted string — either a property KEY (new or
    // existing) or a property VALUE ("type", or a parameter value).
    //
    private completeStringPosition(
        node: json.Node,
        version: VersionString,
        document: vscode.TextDocument,
    ): vscode.CompletionItem[] | undefined {

        const property = node.parent;

        if (!property || property.type !== "property" || !property.parent) {
            return undefined;
        }

        const containerObject = property.parent;
        const isKey = property.children?.[0] === node;

        if (isKey) {
            return this.completeKey(containerObject, node, version, document);
        }

        const keyName = property.children?.[0]?.value as string | undefined;

        if (keyName === undefined) {
            return undefined;
        }

        if (keyName === "type") {
            return this.completeTypeValue(containerObject, node, version, document);
        }

        const owningElement = this.parametersOwnerOf(containerObject);

        if (owningElement) {
            return this.completeParameterValue(owningElement, keyName, node, version, document);
        }

        return undefined;
    }

    //
    // Cursor is inside an object: either an empty element-slot inside a
    // "children" array (offer whole-element snippets), or any other
    // object about to receive a new key (offer keys).
    //
    private completeObjectPosition(
        node: json.Node,
        version: VersionString,
        document: vscode.TextDocument,
    ): vscode.CompletionItem[] | undefined {

        const isEmpty = (node.children?.length ?? 0) === 0;

        if (isEmpty && node.parent?.type === "array") {

            const arrayNode = node.parent;
            const childrenProperty = arrayNode.parent;

            if (
                childrenProperty?.type === "property" &&
                childrenProperty.children?.[0]?.value === "children" &&
                childrenProperty.parent
            ) {

                const ownerElement = childrenProperty.parent;
                const definition = this.definitionOf(ownerElement, version);
                const candidates = definition ? resolveAllowedChildren(definition, version) : [];

                const range = new vscode.Range(
                    document.positionAt(node.offset),
                    document.positionAt(node.offset + node.length),
                );

                return candidates.map((candidate) => this.makeSnippetItem(candidate, range));
            }
        }

        return this.completeKey(node, undefined, version, document);
    }

    //
    // Cursor is directly inside an array (no "{" typed yet at this slot).
    // Only meaningful for a "children" array.
    //
    private completeArrayPosition(
        node: json.Node,
        version: VersionString,
    ): vscode.CompletionItem[] | undefined {

        const childrenProperty = node.parent;

        if (
            !childrenProperty ||
            childrenProperty.type !== "property" ||
            childrenProperty.children?.[0]?.value !== "children" ||
            !childrenProperty.parent
        ) {
            return undefined;
        }

        const ownerElement = childrenProperty.parent;
        const definition = this.definitionOf(ownerElement, version);
        const candidates = definition ? resolveAllowedChildren(definition, version) : [];

        // No existing braces at this slot to replace — fall back to a
        // fully self-contained snippet.
        return candidates.map((candidate) => this.makeSnippetItem(candidate, undefined));
    }

    //
    // Key completion — dispatches to either "properties of this element"
    // or "parameters of this element" depending on what containerObject
    // actually is.
    //
    private completeKey(
        containerObject: json.Node,
        existingKeyNode: json.Node | undefined,
        version: VersionString,
        document: vscode.TextDocument,
    ): vscode.CompletionItem[] {

        const keyEdit = existingKeyNode ? this.keyEditFor(existingKeyNode, document) : undefined;
        const existingKeys = this.existingObjectKeys(containerObject);

        const owningElement = this.parametersOwnerOf(containerObject);

        if (owningElement) {

            const definition = this.definitionOf(owningElement, version);

            if (!definition) {
                return [];
            }

            return resolveSupportedParameters(definition, version)
                .filter(([name]) => !existingKeys.has(name))
                .map(([name, parameterDefinition]) => this.makeParameterItem(name, parameterDefinition, keyEdit, version));
        }

        const items: vscode.CompletionItem[] = [];

        for (const key of RESERVED_KEYS) {
            if (!existingKeys.has(key)) {
                items.push(this.makeKeywordItem(key, keyEdit));
            }
        }

        const definition = this.definitionOf(containerObject, version);

        if (definition) {

            for (const [name, propertyDefinition] of resolveSupportedProperties(definition, version)) {

                if (!existingKeys.has(name)) {
                    items.push(this.makePropertyItem(name, propertyDefinition, keyEdit));
                }
            }
        }

        return items;
    }

    //
    // "type": "|"  -> allowed types at this position
    //
    private completeTypeValue(
        elementObject: json.Node,
        valueNode: json.Node,
        version: VersionString,
        document: vscode.TextDocument,
    ): vscode.CompletionItem[] {

        const candidates = this.isRoot(elementObject)
            ? allRootDefinitions(version)
            : this.allowedChildrenOfParent(elementObject, version);

        const range = this.stringInterior(valueNode, document);

        return candidates.map((definition) =>
            this.makeValueItem(definition.type, definition.description, range),
        );
    }

    private allowedChildrenOfParent(
        elementObject: json.Node,
        version: VersionString,
    ): ElementDefinition[] {

        const parentElement = this.parentElementOf(elementObject);

        if (!parentElement) {
            return [];
        }

        const parentDefinition = this.definitionOf(parentElement, version);

        return parentDefinition ? resolveAllowedChildren(parentDefinition, version) : [];
    }

    //
    // "parameters": { "someParam": "|" }  -> its enumValues, if any
    //
    private completeParameterValue(
        owningElement: json.Node,
        paramName: string,
        valueNode: json.Node,
        version: VersionString,
        document: vscode.TextDocument,
    ): vscode.CompletionItem[] | undefined {

        const definition = this.definitionOf(owningElement, version);

        if (!definition) {
            return undefined;
        }

        const parameterDefinition = definition.parameters[paramName];

        if (!parameterDefinition) {
            return undefined;
        }

        const values = resolveSupportedEnumValues(parameterDefinition, version);

        if (values.length === 0) {
            return undefined;
        }

        const range = this.stringInterior(valueNode, document);

        return values.map((value) => this.makeValueItem(String(value), undefined, range));
    }

    //
    // AST navigation helpers
    //

    /**
     * If `containerObject` is the value of a "parameters" property,
     * returns the element object that OWNS that "parameters" property.
     * Otherwise returns undefined (containerObject is an element object
     * itself, or something else entirely).
     */
    private parametersOwnerOf(
        containerObject: json.Node
    ): json.Node | undefined {

        const owningProperty = containerObject.parent;

        if (
            owningProperty?.type === "property" &&
            owningProperty.children?.[0]?.value === "parameters" &&
            owningProperty.parent
        ) {
            return owningProperty.parent;
        }

        return undefined;
    }

    /**
     * If `elementObject` sits directly inside some parent's "children"
     * array, returns that parent element object. Otherwise undefined
     * (elementObject is the document root).
     */
    private parentElementOf(
        elementObject: json.Node
    ): json.Node | undefined {

        const arrayNode = elementObject.parent;

        if (!arrayNode || arrayNode.type !== "array") {
            return undefined;
        }

        const childrenProperty = arrayNode.parent;

        if (
            !childrenProperty ||
            childrenProperty.type !== "property" ||
            childrenProperty.children?.[0]?.value !== "children" ||
            !childrenProperty.parent
        ) {
            return undefined;
        }

        return childrenProperty.parent;
    }

    private isRoot(elementObject: json.Node): boolean {
        return elementObject.parent === undefined;
    }

    private definitionOf(
        elementObject: json.Node,
        version: VersionString,
    ): ElementDefinition | undefined {

        const type = this.typeValueOf(elementObject);
        return type ? findDefinition(type, version) : undefined;
    }

    private typeValueOf(
        elementObject: json.Node
    ): string | undefined {

        const typeProperty = elementObject.children?.find(
            (property) => property.type === "property" && property.children?.[0]?.value === "type",
        );

        const valueNode = typeProperty?.children?.[1];

        return valueNode?.type === "string" ? (valueNode.value as string) : undefined;
    }

    private existingObjectKeys(
        node: json.Node
    ): Set<string> {

        const keys = new Set<string>();

        for (const property of node.children ?? []) {

            const nameNode = property.children?.[0];

            if (nameNode?.type === "string") {
                keys.add(nameNode.value as string);
            }
        }

        return keys;
    }

    /**
     * Range spanning the INTERIOR of a string node only — i.e. excluding
     * both quote characters. Replacing exactly this range guarantees
     * exactly one pair of quotes survives, regardless of whether the
     * editor auto-closed the opening quote or not.
     */
    private stringInterior(
        node: json.Node,
        document: vscode.TextDocument
    ): vscode.Range {

        return new vscode.Range(
            document.positionAt(node.offset + 1),
            document.positionAt(node.offset + node.length - 1),
        );
    }

    /**
     * Like stringInterior, but also returns the position right after the
     * closing quote, so the ": <value>" scaffold can be appended there as
     * a SEPARATE edit instead of being baked into the same replacement.
     */
    private keyEditFor(
        node: json.Node,
        document: vscode.TextDocument
    ): KeyEdit {

        return {
            range: this.stringInterior(node, document),
            insertAfter: document.positionAt(node.offset + node.length),
        };
    }

    //
    // Completion item factories
    //

    private makeValueItem(
        value: string,
        detail: string | undefined,
        range: vscode.Range | undefined,
    ): vscode.CompletionItem {

        const item = new vscode.CompletionItem(value, vscode.CompletionItemKind.Value);

        if (detail) {
            item.detail = detail;
        }

        if (range) {
            item.range = range;
            item.insertText = value;
        } else {
            // No existing quoted string at the cursor — insert a
            // complete, self-quoted value instead.
            item.insertText = `"${value}"`;
        }

        return item;
    }

    private makeKeywordItem(
        key: typeof RESERVED_KEYS[number],
        keyEdit: KeyEdit | undefined,
    ): vscode.CompletionItem {

        const item = new vscode.CompletionItem(key, vscode.CompletionItemKind.Keyword);

        const scaffold =
            key === "type" ? `: ""` :
                key === "parameters" ? `: {}` :
                    `: []`;

        this.applyKeyEdit(item, key, scaffold, keyEdit);

        return item;
    }

    private makePropertyItem(
        name: string,
        definition: PropertyDefinition,
        keyEdit: KeyEdit | undefined,
    ): vscode.CompletionItem {

        const item = new vscode.CompletionItem(name, vscode.CompletionItemKind.Property);

        const requiredLabel = definition.state === PropertyState.REQUIRED ? " · required" : "";
        item.detail = `${definition.kind} ${definition.type}${requiredLabel} — ${definition.description}`;

        const doc = new vscode.MarkdownString();
        doc.appendMarkdown(definition.description);

        if (definition.since || definition.until) {
            doc.appendMarkdown(`\n\n_${describeVersionConstraint(definition)}_`);
        }

        item.documentation = doc;

        this.applyKeyEdit(item, name, `: ${this.defaultValueScaffold(definition.kind, definition.type)}`, keyEdit);

        return item;
    }

    private makeParameterItem(
        name: string,
        definition: ParameterDefinition,
        keyEdit: KeyEdit | undefined,
        version: VersionString,
    ): vscode.CompletionItem {

        const item = new vscode.CompletionItem(name, vscode.CompletionItemKind.Field);

        const requiredLabel = definition.required ? " · required" : "";
        const enumValues = resolveSupportedEnumValues(definition, version);
        const enumLabel = enumValues.length > 0 ? ` · one of: ${enumValues.join(", ")}` : "";

        item.detail = `${definition.kind} ${definition.type}${requiredLabel}${enumLabel} — ${definition.description}`;

        const doc = new vscode.MarkdownString();
        doc.appendMarkdown(definition.description);

        if (enumValues.length > 0) {
            doc.appendMarkdown(`\n\n**Allowed values:** ${enumValues.map((value) => `\`${value}\``).join(", ")}`);
        }

        if (definition.since || definition.until) {
            doc.appendMarkdown(`\n\n_${describeVersionConstraint(definition)}_`);
        }

        item.documentation = doc;

        this.applyKeyEdit(item, name, `: ${this.defaultValueScaffold(definition.kind, definition.type)}`, keyEdit);

        return item;
    }

    private makeSnippetItem(
        definition: ElementDefinition,
        range: vscode.Range | undefined,
    ): vscode.CompletionItem {

        const item = new vscode.CompletionItem(definition.type, vscode.CompletionItemKind.Snippet);

        item.detail = definition.description;
        item.documentation = new vscode.MarkdownString(definition.description);
        item.insertText = new vscode.SnippetString(
            `{\n\t"type": "${definition.type}"$0\n}`,
        );

        if (range) {
            item.range = range;
        }

        return item;
    }

    /**
     * Replaces `keyEdit.range` with the plain key name, then appends
     * ": <scaffold>" right after the key's closing quote via a SEPARATE
     * text edit. Keeping these as two distinct edits — instead of one
     * snippet string containing quotes of its own — is what avoids
     * fighting with the editor's auto-closed quote.
     */
    private applyKeyEdit(
        item: vscode.CompletionItem,
        keyName: string,
        valueScaffold: string,
        keyEdit: KeyEdit | undefined,
    ): void {

        if (keyEdit) {
            item.range = keyEdit.range;
            item.insertText = keyName;
            item.additionalTextEdits = [
                vscode.TextEdit.insert(keyEdit.insertAfter, valueScaffold),
            ];
        } else {
            // No existing quoted key at the cursor — insert a complete,
            // self-quoted key/value pair instead.
            item.insertText = `"${keyName}"${valueScaffold}`;
        }
    }

    private defaultValueScaffold(kind: PropertyKind, type: ValueType): string {

        if (kind === PropertyKind.LIST) {
            return "[]";
        }

        if (kind === PropertyKind.MAP) {
            return "{}";
        }

        // SCALAR
        switch (type) {

            case ValueType.STRING:
                return `""`;

            case ValueType.BOOLEAN:
                return "false";

            case ValueType.NUMBER:

            default:
                return "0";
        }
    }
}
