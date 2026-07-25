import * as vscode from "vscode";
import * as json from "jsonc-parser";

import { ElementDefinition, ParameterDefinition, PropertyState, SYSTEM_FIELDS, ValueType } from "../registry/ElementDefinitions";
import { TypeRegistry } from "../registry/ElementTypes";
import { parseReplacementValue } from "../registry/ReplacementValue";


export function validateDocument(
    document: vscode.TextDocument,
    diagnostics: vscode.DiagnosticCollection,
): void {


    const errors: vscode.Diagnostic[] = [];
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
                length: error.length,
            } as json.Node,
            json.printParseErrorCode(error.error)
        );
    }


    if (!root) {
        diagnostics.set(document.uri, errors);
        return;
    }


    const filePath = document.uri.fsPath;

    validateFileLocation(
        document,
        root,
        errors
    );


    //
    // ROOT RESOLUTION
    //
    const rootType =
        getProperty(root, "type")?.children?.[1];


    if (rootType?.type === "string") {

        const rootDefinition =
            findDefinition(rootType.value as string);


        if (!rootDefinition) {

            addDiagnostic(
                document,
                errors,
                rootType,
                `Root type "${rootType.value}" not found in TypeRegistry.`,
            );

        } else {

            //
            // Root itself is resolved.
            // Now validate its children using ONLY
            // the root's allowedChildren list.
            //
            const rootChildren =
                resolveAllowedChildren(rootDefinition);


            const childrenNode =
                getProperty(root, "children")?.children?.[1];


            if (childrenNode?.type === "array") {

                for (const child of childrenNode.children ?? []) {

                    validateTree(
                        child,
                        rootChildren,
                        document,
                        errors,
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

function validateFileLocation(
    document: vscode.TextDocument,
    root: json.Node,
    diagnostics: vscode.Diagnostic[],
): void {

    const filePath = document.uri.fsPath.replace(/\\/g, "/");

    if (!filePath.includes("/resources/templates/")) {

        addDiagnostic(
            document,
            diagnostics,
            root,
            `GED files should be located inside "/resources/templates/".`,
            vscode.DiagnosticSeverity.Warning,
        );
    }
}


function validateTree(
    node: json.Node,
    possibleDefinitions: ElementDefinition[],
    document: vscode.TextDocument,
    diagnostics: vscode.Diagnostic[],
): void {

    const typeNode =
        getProperty(node, "type")?.children?.[1];

    if (!typeNode || typeNode.type !== "string") {
        return;
    }


    const nodeType = typeNode.value as string;


    //
    // Resolve this node ONLY against the list supplied by parent
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
    );

    validateParameters(
        node,
        definition,
        document,
        diagnostics,
    );


    //
    // This node is now resolved.
    // Generate the list valid ONLY for its direct children.
    //
    const childDefinitions =
        resolveAllowedChildren(definition);


    const childrenNode =
        getProperty(node, "children")?.children?.[1];


    if (!childrenNode || childrenNode.type !== "array") {
        return;
    }


    //
    // Push this node's child list down one level
    //
    for (const child of childrenNode.children ?? []) {

        validateTree(
            child,
            childDefinitions,
            document,
            diagnostics,
        );
    }
}

/**
 * Find a type definition exactly like GedParser did.
 */
function findDefinition(
    type: string,
): ElementDefinition | undefined {

    for (const key in TypeRegistry) {

        const definition =
            TypeRegistry[key];

        if (definition.type.toLowerCase() === type.toLowerCase()) {
            return definition;
        }
    }

    return undefined;
}


/**
 * Resolve enum IDs from allowedChildren
 * into actual ElementDefinitions.
 */
function resolveAllowedChildren(
    definition: ElementDefinition,
): ElementDefinition[] {

    const result: ElementDefinition[] = [];

    for (const enumId of definition.allowedChildren) {

        const childDefinition = TypeRegistry[enumId];

        if (childDefinition) {
            result.push(childDefinition);
        }
    }

    return result;
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
        // Type validation
        //
        const valueNode = property.children?.[1];

        if (valueNode) {

            if (!checkForReplacementValue(valueNode, document, diagnostics)
                && !matchesType(valueNode, propertyDefinition.type)) {

                addDiagnostic(
                    document,
                    diagnostics,
                    valueNode,
                    `Property "${name}" must be of type "${propertyDefinition.type}".`,
                );
            }
        }
    }


    //
    // Required property check
    //
    for (const [name, propertyDefinition] of Object.entries(definition.properties)) {

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

function validateParameters(
    node: json.Node,
    definition: ElementDefinition,
    document: vscode.TextDocument,
    diagnostics: vscode.Diagnostic[],
): void {

    const parametersNode =
        getProperty(node, "parameters")?.children?.[1];


    //
    // Missing parameters object
    //
    if (!parametersNode || parametersNode.type !== "object") {

        for (const [name, parameter] of Object.entries(definition.parameters)) {

            if (parameter.required) {
                addDiagnostic(
                    document,
                    diagnostics,
                    node,
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

        if (!definition.parameters[name]) {

            addDiagnostic(
                document,
                diagnostics,
                nodes.nameNode,
                `Unknown parameter "${name}" for type "${definition.type}".`,
            );
        }
    }

    //
    // Conflict validation
    //
    for (const [name, parameterDefinition] of Object.entries(definition.parameters)) {

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
    for (const [name, paramDef] of Object.entries(definition.parameters)) {

        const entry = existingParameters.get(name);

        const valueNode = entry?.valueNode;

        //
        // Required check
        //
        if (!valueNode) {

            if (paramDef.required) {

                addDiagnostic(
                    document,
                    diagnostics,
                    parametersNode,
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
        );
    }
}

function validateParameterValue(
    name: string,
    node: json.Node,
    definition: ParameterDefinition,
    document: vscode.TextDocument,
    diagnostics: vscode.Diagnostic[],
): void {

    //
    // Replacement value ("$$identifier$name") — exempt from type/enum
    // checks below. Identifier validity is already diagnosed inside.
    //
    if (!definition.isArray && checkForReplacementValue(node, document, diagnostics)) {
        return;
    }

    //
    // Array validation
    //
    if (definition.isArray) {

        if (node.type !== "array") {

            addDiagnostic(
                document,
                diagnostics,
                node,
                `Parameter "${name}" must be an array.`,
            );

            return;
        }

    } else {

        if (!matchesType(node, definition.type)) {

            addDiagnostic(
                document,
                diagnostics,
                node,
                `Parameter "${name}" must be of type "${definition.type}".`,
            );

            return;
        }
    }


    //
    // Enum validation
    //
    if (definition.enumValues) {

        const value = node.value;


        if (!definition.enumValues.includes(value)) {

            addDiagnostic(
                document,
                diagnostics,
                node,
                `Invalid value "${value}" for "${name}". Allowed values: [${definition.enumValues.join(", ")}]`,
            );
        }
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


        case ValueType.BOOLEAN:
            return node.type === "boolean";


        default:
            return false;
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
            `Unknown replacement identifier "${replacement.identifier}". Expected one of: value, text, function.`,
        );
    }

    return true;
}