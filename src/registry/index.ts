import { CONTENT } from "./elements/content";
import { BUTTON } from "./elements/button";
import { ElementDefinition } from "./types";
import { BURGER } from "./elements/burger";
import { BURGER_ITEM } from "./elements/burgerItem";
import { AUDIO } from "./elements/audio";

export const elementRegistry: Record<string, ElementDefinition> = {
    audio: AUDIO,
    button: BUTTON,
    burger: BURGER,
    burger_item: BURGER_ITEM,
    content: CONTENT,
};

export function getElementDefinition(type: string): ElementDefinition | undefined {
    return elementRegistry[type.toLowerCase()];
}

export function getElementTypes(): string[] {
    return Object.keys(elementRegistry);
}
