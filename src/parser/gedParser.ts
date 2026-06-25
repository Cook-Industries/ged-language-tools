import { Node, parseTree } from "jsonc-parser";
import { ElementDefinition, ParameterDefinition } from "../registry/types";
import { getElementDefinition } from "../registry";

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
    currentProperty?: string;
    currentParameter?: ParameterDefinition;
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

export function findElementNode(root: Node, offset: number): Node | undefined {
    let node = findNodeAtOffset(root, offset);

    while (node) {
        if (node.type === "object" && hasTypeProperty(node)) {
            return node;
        }

        node = node.parent;
    }

    return undefined;
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

function getPropertyAncestor(node: Node | undefined): Node | undefined {
    while (node) {
        if (node.type === "property") {
            return node;
        }

        node = node.parent;
    }

    return undefined;
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

    let currentProperty: string | undefined;
    let section = GedContextType.ROOT;

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
                    section = GedContextType.TYPE;

                    break;

                case "parameters":
                    section = GedContextType.PARAMETERS;

                    break;

                case "attributes":
                    section = GedContextType.ATTRIBUTES;

                    break;

                case "children":
                    section = GedContextType.CHILDREN;

                    break;
            }
        }

        node = node.parent;
    }

    const currentParameter =
        section === GedContextType.PARAMETERS && currentProperty && currentElement?.definition?.parameters[currentProperty]
            ? currentElement.definition.parameters[currentProperty]
            : undefined;

    return {
        section,
        currentElement,
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
