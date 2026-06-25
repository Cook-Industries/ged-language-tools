import { CONTENT } from "./content";
import { BUTTON } from "./button";
import { ElementDefinition } from "./types";

export const elementRegistry: Record<string, ElementDefinition> = {
    content: CONTENT,
    button: BUTTON,
};

export function getElementDefinition(type: string): ElementDefinition | undefined {
    return elementRegistry[type.toLowerCase()];
}

export function getElementTypes(): string[] {
    return Object.keys(elementRegistry);
}
