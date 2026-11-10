import { ELEMENT_SOURCE, ELEMENT_SOURCE_IS_LIST } from "../CommonParameters";
import { ATTRIBUTES_PROPERTY, CLASSES_PROPERTY, UID_PROPERTY } from "../CommonProperties";
import { ElementDefinition } from "../ElementDefinitions";
import { MENU_ENTRY_END } from "./MenuEntryParameters";

export const MENU_SEPARATOR: ElementDefinition = {
    type: "menu_separator",

    description: "separator of a menubar or a menu",

    properties: {
        uid: UID_PROPERTY,
        classes: CLASSES_PROPERTY,
        attributes: ATTRIBUTES_PROPERTY
    },

    parameters: {
        end: MENU_ENTRY_END,
        elementSourceIsList: ELEMENT_SOURCE_IS_LIST,
        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: []
};
