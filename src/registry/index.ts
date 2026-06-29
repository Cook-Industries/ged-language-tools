import { CONTENT } from "./elements/content";
import { BUTTON } from "./elements/button";
import { ElementDefinition } from "./types";
import { BURGER } from "./elements/burger";
import { BURGER_ITEM } from "./elements/burger-item";
import { AUDIO } from "./elements/audio";
import { FORM } from "./elements/form";
import { HEADING } from "./elements/heading";
import { HIDDEN } from "./elements/hidden";
import { IMAGE } from "./elements/image";
import { LINK } from "./elements/link";
import { MODAL } from "./elements/modal";
import { SPLITTED } from "./elements/splitted";
import { SVG } from "./elements/svg";
import { TABBED } from "./elements/tabbed";
import { TABLE } from "./elements/table";
import { TABLE_ROW } from "./elements/table-row";
import { TEXT } from "./elements/text";

export const elementRegistry: Record<string, ElementDefinition> = {
    audio: AUDIO,
    button: BUTTON,
    burger: BURGER,
    burger_item: BURGER_ITEM,
    content: CONTENT,
    form: FORM,
    heading: HEADING,
    hidden: HIDDEN,
    image: IMAGE,
    link: LINK,
    modal: MODAL,
    splitted: SPLITTED,
    svg: SVG,
    tabbed: TABBED,
    table: TABLE,
    table_row: TABLE_ROW,
    text: TEXT
};

export function getElementDefinition(type: string): ElementDefinition | undefined {
    return elementRegistry[type.toLowerCase()];
}

export function getElementTypes(): string[] {
    return Object.keys(elementRegistry);
}
