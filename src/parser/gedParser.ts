import { Node, parseTree } from "jsonc-parser";
import { ElementDefinition, ParameterDefinition } from "../registry/types";
import { getElementDefinition } from "../registry/index";

export enum GedContextType {
    ROOT = "root",
    TYPE = "type",
    PARAMETERS = "parameters",
    ATTRIBUTES = "attributes",
    CHILDREN = "children",
    UNKNOWN = "unknown",
}

export interface ResolvedElement {
    type: string;
    node: Node;
    definition?: ElementDefinition;
}

export interface GedContext {
    section: GedContextType;
    currentElement?: ResolvedElement;
    parentElement?: ResolvedElement;
    currentProperty?: string;
    currentParameter?: ParameterDefinition;
    isNewElement?: boolean;
}

export function getRootNode(text: string): Node | undefined {
    return parseTree(text);
}

function findNodeAtOffset(node: Node, offset: number): Node | undefined {
    if (offset < node.offset || offset > node.offset + node.length) {
        return undefined;
    }

    if (node.children) {
        for (const child of node.children) {
            const found = findNodeAtOffset(child, offset);

            if (found) {
                return found;
            }
        }
    }

    return node;
}

function findDeepestElementNode(node: Node, offset: number): Node | undefined {
    if (offset < node.offset || offset > node.offset + node.length) {
        return undefined;
    }

    let bestMatch: Node | undefined;

    if (node.type === "object" && hasTypeProperty(node)) {
        console.log("Candidate:", getElementType(node), node.offset, node.offset + node.length);

        bestMatch = node;
    }

    for (const child of node.children ?? []) {
        const childMatch = findDeepestElementNode(child, offset);

        if (childMatch) {
            bestMatch = childMatch;
        }
    }

    return bestMatch;
}

export function findElementNode(root: Node, offset: number): Node | undefined {
    return findDeepestElementNode(root, offset);
}

function hasTypeProperty(objectNode: Node): boolean {
    return objectNode.children?.some((property) => property.children?.[0]?.value === "type") ?? false;
}

export function getElementType(elementNode: Node): string | undefined {
    const property = elementNode.children?.find((child) => child.children?.[0]?.value === "type");

    return property?.children?.[1]?.value as string | undefined;
}

export function getTypeAtOffset(text: string, offset: number): string | undefined {
    const root = parseTree(text);

    if (!root) {
        return undefined;
    }

    const element = findElementNode(root, offset);

    if (!element) {
        return undefined;
    }

    return getElementType(element);
}

export function resolveElementAtOffset(text: string, offset: number): ResolvedElement | undefined {
    const root = parseTree(text);

    if (!root) {
        return undefined;
    }

    const elementNode = findElementNode(root, offset);

    console.log("ElementNode type:", elementNode ? getElementType(elementNode) : "<none>");

    if (!elementNode) {
        return undefined;
    }

    const type = getElementType(elementNode);

    if (!type) {
        return undefined;
    }

    return {
        type,
        node: elementNode,
        definition: getElementDefinition(type),
    };
}

export function resolveContextAtOffset(text: string, offset: number): GedContext {
    const currentElement = resolveElementAtOffset(text, offset);

    const root = parseTree(text);

    if (!root) {
        return {
            section: GedContextType.UNKNOWN,
            currentElement,
        };
    }

    let node = findNodeAtOffset(root, Math.max(0, offset - 1));

    const objectNode = getEnclosingObjectNode(node);

    if (objectNode && isChildElementObject(objectNode)) {
        const propertyNode = getPropertyAncestor(node);

        const propertyName = getPropertyName(propertyNode);

        switch (propertyName) {
            case "type":
                return {
                    section: GedContextType.TYPE,
                    currentElement,
                };

            case "parameters":
                return {
                    section: GedContextType.PARAMETERS,
                    currentElement,
                };

            case "attributes":
                return {
                    section: GedContextType.ATTRIBUTES,
                    currentElement,
                };
        }

        return {
            section: GedContextType.ROOT,
            currentElement,
            isNewElement: !getElementType(objectNode),
        };
    }

    let currentProperty: string | undefined;
    let section: GedContextType | undefined;

    while (node) {
        if (node.type === "property") {
            const propertyName = getPropertyName(node);

            if (
                propertyName &&
                propertyName !== "type" &&
                propertyName !== "parameters" &&
                propertyName !== "attributes" &&
                propertyName !== "children"
            ) {
                currentProperty ??= propertyName;
            }

            switch (propertyName) {
                case "type":
                    return {
                        section: GedContextType.TYPE,
                        currentElement,
                        currentProperty,
                    };

                case "parameters":
                    section ??= GedContextType.PARAMETERS;
                    break;

                case "attributes":
                    section ??= GedContextType.ATTRIBUTES;
                    break;

                case "children": {
                    const valueNode = node.children?.[1];

                    if (valueNode?.type === "array") {
                        section ??= GedContextType.CHILDREN;
                    }

                    break;
                }
            }
        }

        node = node.parent;
    }

    section ??= GedContextType.ROOT;

    const currentParameter =
        section === GedContextType.PARAMETERS && currentProperty && currentElement?.definition?.parameters[currentProperty]
            ? currentElement.definition.parameters[currentProperty]
            : undefined;

    const parentElement = resolveParentElementAtOffset(text, offset);

    console.log(
        "CurrentObject properties:",
        objectNode?.children?.map((property) => property.children?.[0]?.value),
    );

    return {
        section,
        currentElement,
        parentElement,
        currentProperty,
        currentParameter,
    };
}

function getPropertyName(node: Node | undefined): string | undefined {
    if (node?.type !== "property") {
        return undefined;
    }

    return node.children?.[0]?.value as string | undefined;
}

function isChildElementObject(node: Node): boolean {
    const parent = node.parent;

    if (!parent || parent.type !== "array") {
        return false;
    }

    const propertyNode = parent.parent;

    return propertyNode?.type === "property" && propertyNode.children?.[0]?.value === "children";
}

function getEnclosingObjectNode(node: Node | undefined): Node | undefined {
    while (node) {
        if (node.type === "object") {
            return node;
        }

        node = node.parent;
    }

    return undefined;
}

export function resolveParentElementAtOffset(text: string, offset: number): ResolvedElement | undefined {
    const root = parseTree(text);

    if (!root) {
        return undefined;
    }

    const currentNode = findNodeAtOffset(root, Math.max(0, offset - 1));

    if (currentNode?.type === "object" && !hasTypeProperty(currentNode)) {
        return resolveElementAtOffset(text, currentNode.offset - 1);
    }

    return undefined;
}

function getPropertyAncestor(node: Node | undefined): Node | undefined {
    while (node) {
        if (node.type === "property") {
            return node;
        }

        node = node.parent;
    }

    return undefined;
}
