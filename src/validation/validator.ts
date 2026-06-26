import * as vscode from "vscode";
import { parseTree, Node } from "jsonc-parser";
import { getElementDefinition } from "../registry";
import { ValueType } from "../registry/types";

export function validateDocument(document: vscode.TextDocument, diagnostics: vscode.DiagnosticCollection): void {
    const text = document.getText();

    const root = parseTree(text);

    if (!root) {
        diagnostics.set(document.uri, []);
        return;
    }

    const errors: vscode.Diagnostic[] = [];

    validateNode(document, root, errors);

    diagnostics.set(document.uri, errors);
}

function validateNode(document: vscode.TextDocument, node: Node, errors: vscode.Diagnostic[]): void {
    if (node.type === "object" && hasTypeProperty(node)) {
        validateElementType(document, node, errors);

        validateParameters(document, node, errors);

        validateRequiredParameters(document, node, errors);

        validateEnumValues(document, node, errors);

        validateParameterTypes(document, node, errors);

        validateChildElements(document, node, errors);

        validateChildren(document, node, errors);
    }

    if (node.children) {
        for (const child of node.children) {
            validateNode(document, child, errors);
        }
    }
}

function hasTypeProperty(objectNode: Node): boolean {
    return objectNode.children?.some((property) => property.children?.[0]?.value === "type") ?? false;
}

function getElementType(elementNode: Node): string | undefined {
    const property = elementNode.children?.find((child) => child.children?.[0]?.value === "type");

    return property?.children?.[1]?.value as string | undefined;
}

function validateElementType(document: vscode.TextDocument, node: Node, errors: vscode.Diagnostic[]): void {
    const type = getElementType(node);

    if (type && !getElementDefinition(type)) {
        const property = node.children?.find((child) => child.children?.[0]?.value === "type");

        const typeNode = property?.children?.[1];

        if (!typeNode) {
            return;
        }

        const range = new vscode.Range(document.positionAt(typeNode.offset), document.positionAt(typeNode.offset + typeNode.length));

        errors.push(new vscode.Diagnostic(range, `Unknown element type '${type}'`, vscode.DiagnosticSeverity.Error));
    }
}

function validateChildElements(document: vscode.TextDocument, node: Node, errors: vscode.Diagnostic[]): void {
    const childrenProperty = node.children?.find((child) => child.children?.[0]?.value === "children");

    const childrenArray = childrenProperty?.children?.[1];

    if (childrenArray?.type !== "array") {
        return;
    }

    for (const childNode of childrenArray.children ?? []) {
        if (childNode.type !== "object") {
            continue;
        }

        if (!hasTypeProperty(childNode)) {
            const range = new vscode.Range(document.positionAt(childNode.offset), document.positionAt(childNode.offset + childNode.length));

            errors.push(
                new vscode.Diagnostic(range, "Child element is missing mandatory property 'type'", vscode.DiagnosticSeverity.Error),
            );
        }
    }
}

function validateParameters(document: vscode.TextDocument, node: Node, errors: vscode.Diagnostic[]): void {
    const type = getElementType(node);

    const definition = type ? getElementDefinition(type) : undefined;

    if (!definition) {
        return;
    }

    const parametersProperty = node.children?.find((child) => child.children?.[0]?.value === "parameters");

    const parametersObject = parametersProperty?.children?.[1];

    if (parametersObject?.type !== "object") {
        return;
    }

    for (const parameterNode of parametersObject.children ?? []) {
        const parameterName = parameterNode.children?.[0]?.value as string | undefined;

        if (parameterName && !definition.parameters[parameterName]) {
            const keyNode = parameterNode.children?.[0];

            if (!keyNode) {
                continue;
            }

            const range = new vscode.Range(document.positionAt(keyNode.offset), document.positionAt(keyNode.offset + keyNode.length));

            errors.push(new vscode.Diagnostic(range, `Unknown parameter '${parameterName}'`, vscode.DiagnosticSeverity.Error));
        }
    }
}

function validateRequiredParameters(document: vscode.TextDocument, node: Node, errors: vscode.Diagnostic[]): void {
    const type = getElementType(node);

    const definition = type ? getElementDefinition(type) : undefined;

    if (!definition) {
        return;
    }

    const parametersProperty = node.children?.find((child) => child.children?.[0]?.value === "parameters");

    const parametersObject = parametersProperty?.children?.[1];

    const existingParameters = new Set<string>();

    if (parametersObject?.type === "object") {
        for (const parameterNode of parametersObject.children ?? []) {
            const parameterName = parameterNode.children?.[0]?.value as string | undefined;

            if (parameterName) {
                existingParameters.add(parameterName);
            }
        }
    }

    for (const [name, parameter] of Object.entries(definition.parameters)) {
        if (parameter.required && !existingParameters.has(name)) {
            const property = node.children?.find((child) => child.children?.[0]?.value === "parameters");

            const diagnosticNode = property ?? node;

            const range = new vscode.Range(
                document.positionAt(diagnosticNode.offset),
                document.positionAt(diagnosticNode.offset + diagnosticNode.length),
            );

            errors.push(new vscode.Diagnostic(range, `Missing required parameter '${name}'`, vscode.DiagnosticSeverity.Error));
        }
    }
}

function validateEnumValues(document: vscode.TextDocument, node: Node, errors: vscode.Diagnostic[]): void {
    const type = getElementType(node);

    const definition = type ? getElementDefinition(type) : undefined;

    if (!definition) {
        return;
    }

    const parametersProperty = node.children?.find((child) => child.children?.[0]?.value === "parameters");

    const parametersObject = parametersProperty?.children?.[1];

    if (parametersObject?.type !== "object") {
        return;
    }

    for (const parameterNode of parametersObject.children ?? []) {
        const parameterName = parameterNode.children?.[0]?.value as string | undefined;

        if (!parameterName) {
            continue;
        }

        const parameterDefinition = definition.parameters[parameterName];

        if (!parameterDefinition || !parameterDefinition.enumValues) {
            continue;
        }

        const valueNode = parameterNode.children?.[1];

        const value = valueNode?.value;

        if (!parameterDefinition.enumValues.includes(value)) {
            if (!valueNode) {
                continue;
            }

            const range = new vscode.Range(document.positionAt(valueNode.offset), document.positionAt(valueNode.offset + valueNode.length));

            errors.push(
                new vscode.Diagnostic(range, `Invalid value '${value}' for parameter '${parameterName}'`, vscode.DiagnosticSeverity.Error),
            );
        }
    }
}

function validateParameterTypes(document: vscode.TextDocument, node: Node, errors: vscode.Diagnostic[]): void {
    const type = getElementType(node);

    const definition = type ? getElementDefinition(type) : undefined;

    if (!definition) {
        return;
    }

    const parametersProperty = node.children?.find((child) => child.children?.[0]?.value === "parameters");

    const parametersObject = parametersProperty?.children?.[1];

    if (parametersObject?.type !== "object") {
        return;
    }

    for (const parameterNode of parametersObject.children ?? []) {
        const parameterName = parameterNode.children?.[0]?.value as string | undefined;

        if (!parameterName) {
            continue;
        }

        const parameterDefinition = definition.parameters[parameterName];

        if (!parameterDefinition) {
            continue;
        }

        const valueNode = parameterNode.children?.[1];

        if (!valueNode) {
            continue;
        }

        const value = valueNode.value;

        let valid = true;

        switch (parameterDefinition.type) {
            case ValueType.STRING:
                valid = typeof value === "string";
                break;

            case ValueType.NUMBER:
                valid = typeof value === "number";
                break;

            case ValueType.BOOLEAN:
                valid = typeof value === "boolean";
                break;
        }

        if (!valid) {
            const range = new vscode.Range(document.positionAt(valueNode.offset), document.positionAt(valueNode.offset + valueNode.length));

            errors.push(new vscode.Diagnostic(range, `Expected ${parameterDefinition.type}`, vscode.DiagnosticSeverity.Error));
        }
    }
}

function validateChildren(document: vscode.TextDocument, node: Node, errors: vscode.Diagnostic[]): void {
    const parentType = getElementType(node);

    const parentDefinition = parentType ? getElementDefinition(parentType) : undefined;

    if (!parentDefinition) {
        return;
    }

    const childrenProperty = node.children?.find((child) => child.children?.[0]?.value === "children");

    if (childrenProperty && parentDefinition.allowedChildren.length === 0) {
        const keyNode = childrenProperty.children?.[0];

        if (!keyNode) {
            return;
        }

        const range = new vscode.Range(document.positionAt(keyNode.offset), document.positionAt(keyNode.offset + keyNode.length));

        errors.push(new vscode.Diagnostic(range, `'${parentType}' does not allow children`, vscode.DiagnosticSeverity.Error));

        return;
    }

    const childrenArray = childrenProperty?.children?.[1];

    if (childrenArray?.type !== "array") {
        return;
    }

    for (const childNode of childrenArray.children ?? []) {
        if (childNode.type !== "object" || !hasTypeProperty(childNode)) {
            continue;
        }

        const childType = getElementType(childNode);

        if (!childType) {
            continue;
        }

        if (!parentDefinition.allowedChildren.includes(childType)) {
            const property = childNode.children?.find((child) => child.children?.[0]?.value === "type");

            const typeNode = property?.children?.[1];

            if (!typeNode) {
                continue;
            }

            const range = new vscode.Range(document.positionAt(typeNode.offset), document.positionAt(typeNode.offset + typeNode.length));

            const message =
                parentDefinition.allowedChildren.length === 0
                    ? `No children are allowed inside '${parentType}'`
                    : `'${childType}' is not allowed inside '${parentType}'. Allowed children: ${parentDefinition.allowedChildren.join(", ")}`;

            errors.push(new vscode.Diagnostic(range, message, vscode.DiagnosticSeverity.Error));
        }
    }
}
``;
