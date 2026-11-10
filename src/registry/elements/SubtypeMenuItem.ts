import { ELEMENT_SOURCE, ELEMENT_SOURCE_IS_LIST } from "../CommonParameters";
import { ATTRIBUTES_PROPERTY, CLASSES_PROPERTY, UID_PROPERTY } from "../CommonProperties";
import { ElementDefinition, PropertyKind, ValueType } from "../ElementDefinitions";
import { MENU_ENTRY_END, MENU_ENTRY_ICON, MENU_ENTRY_ICON_ONLY, MENU_ENTRY_TEXT } from "./MenuEntryParameters";

export const MENU_ITEM: ElementDefinition = {
    type: "menu_item",

    description: "item of a menubar or a menu that calls a function",

    properties: {
        uid: UID_PROPERTY,
        classes: CLASSES_PROPERTY,
        attributes: ATTRIBUTES_PROPERTY
    },

    parameters: {
        text: MENU_ENTRY_TEXT,
        icon: MENU_ENTRY_ICON,
        iconOnly: MENU_ENTRY_ICON_ONLY,
        end: MENU_ENTRY_END,

        onClick: {
            kind: PropertyKind.SCALAR,
            type: ValueType.FUNCTION,
            description: "onClick function",
            required: true
        },

        elementSourceIsList: ELEMENT_SOURCE_IS_LIST,
        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: []
};
