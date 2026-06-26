import * as vscode from "vscode";
import { getElementTypes, getElementDefinition } from "../registry";
import { commonPropertySnippets } from "../registry/commonProperties";
import { GedContext, GedContextType, resolveContextAtOffset } from "../parser/gedParser";
import { ElementDefinition, ParameterDefinition, ValueType } from "../registry/types";

export class GedCompletionProvider implements vscode.CompletionItemProvider {
    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position): vscode.CompletionItem[] {
        const context = resolveContextAtOffset(document.getText(), document.offsetAt(position));

        console.log(`Section=${context.section}, isNewElement=${context.isNewElement}, Element=${context.currentElement?.type}`);

        //
        // TYPE
        //
        if (context.section === GedContextType.TYPE) {
            vscode.window.showInformationMessage(JSON.stringify(getElementTypes()));

            return getElementTypes().map((type) => {
                const item = new vscode.CompletionItem(type, vscode.CompletionItemKind.Class);

                return item;
            });
        }

        //
        // CHILDREN
        //
        if (context.section === GedContextType.CHILDREN) {
            if (!context.currentElement?.definition) {
                return [];
            }

            return createChildCompletions(context.currentElement.definition);
        }

        //
        // PARAMETERS
        //
        if (context.section === GedContextType.PARAMETERS && context.currentParameter) {
            return createParameterValueCompletions(context.currentParameter, document, position);
        }

        if (context.section === GedContextType.PARAMETERS) {
            if (!context.currentElement?.definition) {
                return [];
            }

            return createParameterCompletions(context.currentElement.definition);
        }

        //
        // ROOT
        //
        if (context.section === GedContextType.ROOT) {
            let properties = Object.keys(commonPropertySnippets);

            if (!context.isNewElement) {
                const existingProperties =
                    context.currentElement?.node.children?.map((property) => property.children?.[0]?.value as string) ?? [];

                properties = properties.filter((property) => !existingProperties.includes(property));
            }

            return properties.map((property) => {
                const item = new vscode.CompletionItem(property, vscode.CompletionItemKind.Property);

                item.insertText = new vscode.SnippetString(commonPropertySnippets[property]);

                return item;
            });
        }

        return [];
    }
}

function createParameterCompletions(definition: ElementDefinition): vscode.CompletionItem[] {
    if (!definition) {
        return [new vscode.CompletionItem("No element definition available", vscode.CompletionItemKind.Text)];
    }

    const parameters = Object.entries(definition.parameters);

    if (parameters.length === 0) {
        const item = new vscode.CompletionItem("No parameters", vscode.CompletionItemKind.Text);

        item.detail = definition.type;
        item.documentation = `${definition.type} does not define any parameters`;

        item.insertText = "";

        return [item];
    }

    return parameters.map(([name, parameter]: [string, any]) => {
        const item = new vscode.CompletionItem(name, vscode.CompletionItemKind.Property);

        item.detail = parameter.type;
        item.documentation = parameter.description;

        switch (parameter.type) {
            case ValueType.STRING:
                item.insertText = new vscode.SnippetString(`"${name}": "$1"`);
                break;

            case ValueType.BOOLEAN:
                item.insertText = new vscode.SnippetString(`"${name}": $1`);
                break;

            case ValueType.NUMBER:
                item.insertText = new vscode.SnippetString(`"${name}": $1`);
                break;

            default:
                item.insertText = new vscode.SnippetString(`"${name}": $1`);
        }

        return item;
    });
}

function createParameterValueCompletions(
    parameter: ParameterDefinition,
    document: vscode.TextDocument,
    position: vscode.Position,
): vscode.CompletionItem[] {
    const enumValues = parameter.enumValues ?? [];

    if (enumValues.length > 0) {
        const insideString = isInsideString(document, position);

        return enumValues.map((value) => {
            const item = new vscode.CompletionItem(String(value), vscode.CompletionItemKind.Value);

            item.insertText = typeof value === "string" ? (insideString ? String(value) : `"${value}"`) : String(value);

            return item;
        });
    }

    switch (parameter.type) {
        case ValueType.BOOLEAN:
            return [
                new vscode.CompletionItem("true", vscode.CompletionItemKind.Value),
                new vscode.CompletionItem("false", vscode.CompletionItemKind.Value),
            ];

        default:
            return [];
    }
}

function isInsideString(document: vscode.TextDocument, position: vscode.Position): boolean {
    const line = document.lineAt(position.line).text;
    return line.substring(0, position.character).endsWith('"');
}

function createChildCompletions(definition: ElementDefinition): vscode.CompletionItem[] {
    return definition.allowedChildren.map((childType) => {
        const item = new vscode.CompletionItem(childType, vscode.CompletionItemKind.Class);

        const childDefinition = getElementDefinition(childType);

        if (childDefinition) {
            item.insertText = createElementSnippet(childDefinition);
        }

        return item;
    });
}

function createElementSnippet(definition: ElementDefinition): vscode.SnippetString {
    const lines = ["{", `    "type": "${definition.type}"`];

    const requiredParameters = Object.entries(definition.parameters).filter(([, parameter]) => parameter.required);

    if (requiredParameters.length > 0) {
        lines[lines.length - 1] += ",";

        lines.push('    "parameters": {');

        requiredParameters.forEach(([name, parameter], index) => {
            let value = `$${index + 1}`;

            switch (parameter.type) {
                case ValueType.STRING:
                    value = `"${value}"`;
                    break;

                case ValueType.BOOLEAN:
                    value = "false";
                    break;

                case ValueType.NUMBER:
                    value = "0";
                    break;
            }

            const comma = index < requiredParameters.length - 1 ? "," : "";

            lines.push(`        "${name}": ${value}${comma}`);
        });

        lines.push("    }");
    }

    lines.push("}");

    return new vscode.SnippetString(lines.join("\n"));
}
