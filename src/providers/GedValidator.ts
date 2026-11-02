import * as vscode from "vscode";
import * as json from "jsonc-parser";

import { ElementDefinition, ParameterDefinition, PropertyDefinition, PropertyKind, PropertyState, resolveRequired, SYSTEM_FIELDS, ValueType } from "../registry/ElementDefinitions";
import {
    findDefinition,
    resolveAllowedChildren,
    resolveSupportedEnumValues,
    resolveSupportedParameters,
    resolveSupportedProperties,
} from "./DefinitionResolver";
import { parseReplacementValue } from "../registry/ReplacementValue";
import { describeVersionConstraint, isVersionSupported, VersionString } from "../Version";
import { getConfiguredVersion } from "../GedConfig";
import { getRegistryKey } from "../registry/ElementTypes";


// Cache of location diagnostics per document, so content-only validation
// passes (which run on every keystroke) don't need to recompute them but
// still include them in the merged diagnostics.set() call.
const locationDiagnosticsCache = new Map<string, vscode.Diagnostic[]>();

/**
 * Full validation: content + location. Used on document open.
 */
export function validateDocument(
    document: vscode.TextDocument,
    diagnostics: vscode.DiagnosticCollection,
): void {

    const locationErrors = computeFileLocationDiagnostics(document);
    locationDiagnosticsCache.set(document.uri.toString(), locationErrors);

    validateDocumentContent(document, diagnostics, locationErrors);
}

/**
 * Content-only validation. Used on every text change — reuses the cached
 * location diagnostic instead of recomputing it on every keystroke.
 */
export function validateDocumentContentOnly(
    document: vscode.TextDocument,
    diagnostics: vscode.DiagnosticCollection,
): void {

    const locationErrors =
        locationDiagnosticsCache.get(document.uri.toString()) ?? [];

    validateDocumentContent(document, diagnostics, locationErrors);
}

/**
 * Re-checks only the file location (e.g. call this if you want a manual
 * refresh, or wire it to onDidChangeConfiguration for live toggling).
 */
export function revalidateFileLocation(
    document: vscode.TextDocument,
    diagnostics: vscode.DiagnosticCollection,
): void {

    validateDocument(document, diagnostics);
}

function validateDocumentContent(
    document: vscode.TextDocument,
    diagnostics: vscode.DiagnosticCollection,
    seedErrors: vscode.Diagnostic[],
): void {

    if (isIgnoredPath(document)) {
        diagnostics.delete(document.uri);
        return;
    }

    const version = getConfiguredVersion();

    const errors: vscode.Diagnostic[] = [...seedErrors];
    const parseErrors: json.ParseError[] = [];

    const root = json.parseTree(
        document.getText(),
        parseErrors
    );

    //
    // JSON parsing errors
    //
    for (const error of parseErrors) {
        addDiagnostic(
            document,
            errors,
            {
                offset: error.offset,
                length: error.length
            } as json.Node,
            json.printParseErrorCode(error.error)
        );
    }

    if (!root) {
        diagnostics.set(document.uri, errors);
        return;
    }

    //
    // ROOT RESOLUTION
    //
    const rootType =
        getProperty(root, "type")?.children?.[1];

    if (rootType?.type === "string") {

        const rootDefinition = findDefinition(rootType.value as string, version);

        if (!rootDefinition) {

            addDiagnostic(
                document,
                errors,
                rootType,
                `Root type "${rootType.value}" not found in TypeRegistry.`
            );

        } else {

            //
            // Validate the root node's own properties/parameters —
            // previously only children went through this.
            //
            validateProperties(
                root,
                rootDefinition,
                document,
                errors,
                version
            );

            validateParameters(
                root,
                rootDefinition,
                document,
                errors,
                version
            );

            const rootChildren = resolveAllowedChildren(rootDefinition, version);

            const childrenNode = getProperty(root, "children")?.children?.[1];

            const rootDefinitionKey = getRegistryKey(rootDefinition);

            if (childrenNode?.type === "array") {

                for (const child of childrenNode.children ?? []) {

                    validateTree(
                        child,
                        rootChildren,
                        document,
                        errors,
                        version,
                        rootDefinitionKey
                    );
                }
            }
        }
    }

    diagnostics.set(
        document.uri,
        errors,
    );
}

/**
 * Add VS Code diagnostic.
 */
function addDiagnostic(
    document: vscode.TextDocument,
    diagnostics: vscode.Diagnostic[],
    node: json.Node,
    message: string,
    severity: vscode.DiagnosticSeverity = vscode.DiagnosticSeverity.Error,
): void {

    diagnostics.push(
        new vscode.Diagnostic(
            new vscode.Range(
                document.positionAt(node.offset),
                document.positionAt(
                    node.offset + node.length,
                ),
            ),
            message,
            severity,
        ),
    );
}

function isIgnoredPath(document: vscode.TextDocument): boolean {

    const filePath = document.uri.fsPath.replace(/\\/g, "/");

    return vscode.workspace
        .getConfiguration("gedLanguageTools")
        .get<string[]>("ignoredPaths", [])
        .map((ignoredPath) => ignoredPath.replace(/\\/g, "/"))
        .some((ignoredPath) => ignoredPath.length > 0 && filePath.includes(ignoredPath));
}

function computeFileLocationDiagnostics(
    document: vscode.TextDocument,
): vscode.Diagnostic[] {

    const config = vscode.workspace.getConfiguration("gedLanguageTools");
    const enabled = config.get<boolean>("enableLocationCheck", true);

    if (!enabled) {
        return [];
    }

    const filePath = document.uri.fsPath.replace(/\\/g, "/");

    if (filePath.includes("/resources/templates/")) {
        return [];
    }

    const ignoredPaths = config.get<string[]>("ignoredLocationPaths", []);

    const isIgnored = ignoredPaths.some((ignoredPath) =>
        filePath.includes(ignoredPath.replace(/\\/g, "/"))
    );

    if (isIgnored) {
        return [];
    }

    return [
        new vscode.Diagnostic(
            new vscode.Range(0, 0, 0, 0),
            `GED files should be located inside "/resources/templates/".`,
            vscode.DiagnosticSeverity.Warning,
        ),
    ];
}


function validateTree(
    node: json.Node,
    possibleDefinitions: ElementDefinition[],
    document: vscode.TextDocument,
    diagnostics: vscode.Diagnostic[],
    version: VersionString,
    parentType?: string
): void {

    const typeNode = getProperty(node, "type")?.children?.[1];

    if (!typeNode || typeNode.type !== "string") {
        return;
    }

    const nodeType = typeNode.value as string;


    //
    // Resolve this node ONLY against the list supplied by parent
    // (that list has already been filtered by version in
    // resolveAllowedChildren, so no extra check is needed here)
    //
    const definition =
        possibleDefinitions.find(
            def => def.type.toLowerCase() === nodeType.toLowerCase()
        );


    if (!definition) {

        addDiagnostic(
            document,
            diagnostics,
            typeNode,
            `Type "${nodeType}" is not allowed here. Allowed types: [${possibleDefinitions
                .map(d => d.type)
                .join(", ")}]`,
        );

        return;
    }

    //
    // Node is resolved.
    // Validate properties and parameters using this definition.
    //
    validateProperties(
        node,
        definition,
        document,
        diagnostics,
        version
    );

    validateParameters(
        node,
        definition,
        document,
        diagnostics,
        version,
        parentType
    );


    //
    // This node is now resolved.
    // Generate the list valid ONLY for its direct children.
    //
    const childDefinitions = resolveAllowedChildren(definition, version);


    const childrenNode = getProperty(node, "children")?.children?.[1];


    if (!childrenNode || childrenNode.type !== "array") {
        return;
    }

    const definitionKey = getRegistryKey(definition);

    //
    // Push this node's child list down one level
    //
    for (const child of childrenNode.children ?? []) {

        validateTree(
            child,
            childDefinitions,
            document,
            diagnostics,
            version,
            definitionKey
        );
    }
}

/**
 * Find an object property node.
 */
function getProperty(
    node: json.Node,
    name: string,
): json.Node | undefined {

    if (node.type !== "object") {
        return undefined;
    }


    return node.children?.find(
        child =>
            child.type === "property" &&
            child.children?.[0]?.value === name,
    );
}

function validateProperties(
    node: json.Node,
    definition: ElementDefinition,
    document: vscode.TextDocument,
    diagnostics: vscode.Diagnostic[],
    version: VersionString,
): void {

    if (node.type !== "object") {
        return;
    }


    const existingProperties = new Set<string>();


    for (const property of node.children ?? []) {

        const nameNode = property.children?.[0];

        if (!nameNode) {
            continue;
        }


        const name = nameNode.value as string;

        //
        // Ignore GED structural fields
        //
        if (SYSTEM_FIELDS.has(name)) {
            continue;
        }

        existingProperties.add(name);


        const propertyDefinition =
            definition.properties[name];


        //
        // Unknown property
        //
        if (!propertyDefinition) {

            addDiagnostic(
                document,
                diagnostics,
                nameNode,
                `Unknown property "${name}" for type "${definition.type}".`,
            );

            continue;
        }


        //
        // Property not available in the configured version
        // (treated the same as "unknown" from the document's point of view)
        //
        if (!isVersionSupported(version, propertyDefinition)) {

            addDiagnostic(
                document,
                diagnostics,
                nameNode,
                `Property "${name}" is not available for type "${definition.type}" in version ${version} (${describeVersionConstraint(propertyDefinition)}).`,
            );

            continue;
        }


        //
        // Disabled property
        //
        if (
            propertyDefinition.state === PropertyState.DISABLED
        ) {

            addDiagnostic(
                document,
                diagnostics,
                nameNode,
                `Property "${name}" is not allowed for type "${definition.type}".`,
            );

            continue;
        }


        //
        // Type validation (structural, per-kind)
        //
        const valueNode = property.children?.[1];

        if (valueNode) {

            validatePropertyValue(
                name,
                valueNode,
                propertyDefinition,
                document,
                diagnostics,
            );
        }
    }


    //
    // Required property check
    //
    for (const [name, propertyDefinition] of resolveSupportedProperties(definition, version)) {

        if (
            propertyDefinition.state === PropertyState.REQUIRED &&
            !existingProperties.has(name)
        ) {

            addDiagnostic(
                document,
                diagnostics,
                node,
                `Missing required property "${name}" for type "${definition.type}".`,
            );
        }
    }
}

/**
 * Validates a property value against its definition, dispatching on
 * PropertyKind (scalar / list / map). A "$$identifier$name" replacement
 * value covering the WHOLE property is exempt from all structural checks.
 */
function validatePropertyValue(
    name: string,
    node: json.Node,
    definition: PropertyDefinition,
    document: vscode.TextDocument,
    diagnostics: vscode.Diagnostic[],
): void {

    if (checkForReplacementValue(node, document, diagnostics)) {
        return;
    }

    switch (definition.kind) {

        case PropertyKind.SCALAR: {

            if (!matchesType(node, definition.type)) {

                addDiagnostic(
                    document,
                    diagnostics,
                    node,
                    `Property "${name}" must be of type "${definition.type}".`,
                );
            }

            return;
        }

        case PropertyKind.LIST: {

            if (node.type !== "array") {

                addDiagnostic(
                    document,
                    diagnostics,
                    node,
                    `Property "${name}" must be an array.`,
                );

                return;
            }

            for (const element of node.children ?? []) {

                if (checkForReplacementValue(element, document, diagnostics)) {
                    continue;
                }

                if (!matchesType(element, definition.type)) {

                    addDiagnostic(
                        document,
                        diagnostics,
                        element,
                        `Elements of property "${name}" must be of type "${definition.type}".`,
                    );
                }
            }

            return;
        }

        case PropertyKind.MAP: {

            if (node.type !== "object") {

                addDiagnostic(
                    document,
                    diagnostics,
                    node,
                    `Property "${name}" must be an object.`,
                );

                return;
            }

            for (const entry of node.children ?? []) {

                const entryValue = entry.children?.[1];

                if (!entryValue) {
                    continue;
                }

                if (checkForReplacementValue(entryValue, document, diagnostics)) {
                    continue;
                }

                if (!matchesType(entryValue, definition.type)) {

                    addDiagnostic(
                        document,
                        diagnostics,
                        entryValue,
                        `Values of property "${name}" must be of type "${definition.type}".`,
                    );
                }
            }

            return;
        }
    }
}

function validateParameters(
    node: json.Node,
    definition: ElementDefinition,
    document: vscode.TextDocument,
    diagnostics: vscode.Diagnostic[],
    version: VersionString,
    parentType?: string
): void {

    const parametersProperty = getProperty(node, "parameters");
    const parametersNode = parametersProperty?.children?.[1];
    const parametersKeyNode = parametersProperty?.children?.[0];

    //
    // Missing parameters object
    //
    if (!parametersNode || parametersNode.type !== "object") {

        for (const [name, parameter] of resolveSupportedParameters(definition, version)) {

            if (parameter.required) {
                addDiagnostic(
                    document,
                    diagnostics,
                    parametersKeyNode ?? node,
                    `Missing required parameter "${name}" for type "${definition.type}".`,
                );
            }
        }

        return;
    }


    const existingParameters = new Map<
        string,
        {
            nameNode: json.Node;
            valueNode: json.Node;
        }
    >();

    for (const property of parametersNode.children ?? []) {

        const nameNode = property.children?.[0];
        const valueNode = property.children?.[1];

        if (!nameNode || !valueNode) {
            continue;
        }

        existingParameters.set(
            nameNode.value as string,
            {
                nameNode,
                valueNode,
            },
        );
    }

    //
    // Unknown parameter check
    //
    for (const [name, nodes] of existingParameters) {

        const parameterDefinition = definition.parameters[name];

        if (!parameterDefinition) {

            addDiagnostic(
                document,
                diagnostics,
                nodes.nameNode,
                `Unknown parameter "${name}" for type "${definition.type}".`,
            );

            continue;
        }

        //
        // Parameter not available in the configured version
        // (treated the same as "unknown" from the document's point of view)
        //
        if (!isVersionSupported(version, parameterDefinition)) {

            addDiagnostic(
                document,
                diagnostics,
                nodes.nameNode,
                `Parameter "${name}" is not available for type "${definition.type}" in version ${version} (${describeVersionConstraint(parameterDefinition)}).`,
            );
        }
    }

    //
    // Conflict validation
    //
    for (const [name, parameterDefinition] of resolveSupportedParameters(definition, version)) {

        const currentParameter =
            existingParameters.has(name);

        if (!currentParameter) {
            continue;
        }


        if (!parameterDefinition.conflictsWith) {
            continue;
        }


        for (const conflict of parameterDefinition.conflictsWith) {

            const conflictingParameter =
                Object.entries(definition.parameters)
                    .find(
                        ([, parameter]) =>
                            parameter === conflict,
                    )?.[0];


            if (
                conflictingParameter &&
                existingParameters.has(conflictingParameter)
            ) {

                const node =
                    existingParameters.get(name)!.nameNode;


                addDiagnostic(
                    document,
                    diagnostics,
                    node,
                    `Parameter "${name}" conflicts with "${conflictingParameter}".`,
                );
            }
        }
    }


    //
    // Validate declared parameters
    //
    for (const [name, paramDef] of resolveSupportedParameters(definition, version)) {

        const entry = existingParameters.get(name);

        const valueNode = entry?.valueNode;

        //
        // Required check
        //
        if (!valueNode) {

            if (resolveRequired(paramDef, parentType)) {

                addDiagnostic(
                    document,
                    diagnostics,
                    parametersKeyNode ?? parametersNode,
                    `Missing required parameter "${name}".`,
                );
            }

            continue;
        }


        validateParameterValue(
            name,
            valueNode,
            paramDef,
            document,
            diagnostics,
            version,
        );
    }
}

/**
 * Validates a parameter value against its definition, dispatching on
 * PropertyKind (scalar / list / map). A "$$identifier$name" replacement
 * value covering the WHOLE parameter is exempt from all structural/enum
 * checks. Individual elements/values inside a list/map can ALSO be
 * replacement values, independently of the others.
 *
 * enumValues, when present, is checked against every resolved scalar:
 * the single value for SCALAR, or each element/value for LIST/MAP —
 * filtered down to whichever enum values are valid for the configured
 * version first.
 */
function validateParameterValue(
    name: string,
    node: json.Node,
    definition: ParameterDefinition,
    document: vscode.TextDocument,
    diagnostics: vscode.Diagnostic[],
    version: VersionString,
): void {

    if (definition.kind === PropertyKind.SCALAR && definition.type === ValueType.FUNCTION) {

        validateFunctionValue(name, node, document, diagnostics);

        return;
    }

    if (checkForReplacementValue(node, document, diagnostics)) {
        return;
    }

    switch (definition.kind) {

        case PropertyKind.SCALAR: {

            if (!matchesType(node, definition.type)) {

                addDiagnostic(
                    document,
                    diagnostics,
                    node,
                    `Parameter "${name}" must be of type "${definition.type}".`,
                );

                return;
            }

            validateEnumValue(name, node, definition, document, diagnostics, version);

            return;
        }

        case PropertyKind.LIST: {

            if (node.type !== "array") {

                addDiagnostic(
                    document,
                    diagnostics,
                    node,
                    `Parameter "${name}" must be an array.`,
                );

                return;
            }

            for (const element of node.children ?? []) {

                if (checkForReplacementValue(element, document, diagnostics)) {
                    continue;
                }

                if (!matchesType(element, definition.type)) {

                    addDiagnostic(
                        document,
                        diagnostics,
                        element,
                        `Elements of parameter "${name}" must be of type "${definition.type}".`,
                    );

                    continue;
                }

                validateEnumValue(name, element, definition, document, diagnostics, version);
            }

            return;
        }

        case PropertyKind.MAP: {

            if (node.type !== "object") {

                addDiagnostic(
                    document,
                    diagnostics,
                    node,
                    `Parameter "${name}" must be an object.`,
                );

                return;
            }

            for (const entry of node.children ?? []) {

                const entryValue = entry.children?.[1];

                if (!entryValue) {
                    continue;
                }

                if (checkForReplacementValue(entryValue, document, diagnostics)) {
                    continue;
                }

                if (!matchesType(entryValue, definition.type)) {

                    addDiagnostic(
                        document,
                        diagnostics,
                        entryValue,
                        `Values of parameter "${name}" must be of type "${definition.type}".`,
                    );

                    continue;
                }

                validateEnumValue(name, entryValue, definition, document, diagnostics, version);
            }

            return;
        }
    }
}

/**
 * Checks a single resolved scalar node against definition.enumValues,
 * if present. Called once for SCALAR params, or once per element/value
 * for LIST/MAP params.
 */
function validateEnumValue(
    name: string,
    node: json.Node,
    definition: ParameterDefinition,
    document: vscode.TextDocument,
    diagnostics: vscode.Diagnostic[],
    version: VersionString,
): void {

    if (!definition.enumValues) {
        return;
    }

    const supportedValues = resolveSupportedEnumValues(definition, version);

    const value = node.value;

    if (!supportedValues.includes(value)) {

        addDiagnostic(
            document,
            diagnostics,
            node,
            `Invalid value "${value}" for "${name}". Allowed values: [${supportedValues.join(", ")}]`,
        );
    }
}

function matchesType(
    node: json.Node,
    type: ValueType,
): boolean {

    switch (type) {

        case ValueType.STRING:
            return node.type === "string";


        case ValueType.NUMBER:
            return node.type === "number";


        case ValueType.NUMBER_OR_STRING:
            return node.type === "number" || node.type === "string";


        case ValueType.BOOLEAN:
            return node.type === "boolean";


        default:
            return false;
    }
}

/**
 * Checks that a parameter of type FUNCTION holds a "$$function$name" token.
 * The library accepts nothing else there, another value fails the element
 * when the page is rendered.
 */
function validateFunctionValue(
    name: string,
    node: json.Node,
    document: vscode.TextDocument,
    diagnostics: vscode.Diagnostic[],
): void {

    const replacement = node.type === "string" ? parseReplacementValue(node.value as string) : null;

    if (!replacement || replacement.identifier !== "function") {

        addDiagnostic(
            document,
            diagnostics,
            node,
            `Parameter "${name}" must be a $$function$<name> token.`,
        );
    }
}

/**
 * Checks whether a string node is a "$$identifier$name" replacement value.
 * If it is, it's exempt from normal type/enum checks (its real value is
 * resolved elsewhere) — but the identifier keyword itself still gets
 * validated here.
 *
 * Returns true if the node IS a replacement value (valid or not),
 * so callers know to skip their own type/enum diagnostics.
 * Returns false if the node is not a replacement value at all.
 */
function checkForReplacementValue(
    node: json.Node,
    document: vscode.TextDocument,
    diagnostics: vscode.Diagnostic[],
): boolean {

    if (node.type !== "string") {
        return false;
    }

    const replacement = parseReplacementValue(node.value as string);

    if (!replacement) {
        return false;
    }

    if (!replacement.isValidIdentifier) {

        addDiagnostic(
            document,
            diagnostics,
            node,
            `Unknown replacement identifier "${replacement.identifier}". Expected one of: value, text, function, class.`,
        );
    }

    return true;
}
