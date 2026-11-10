import { ELEMENT_SOURCE, ELEMENT_SOURCE_IS_LIST } from "../CommonParameters";
import { ATTRIBUTES_PROPERTY, CLASSES_PROPERTY, UID_PROPERTY } from "../CommonProperties";
import { ElementDefinition, PropertyKind, ValueType } from "../ElementDefinitions";
import { MENU_ENTRY_END, MENU_ENTRY_ICON, MENU_ENTRY_ICON_ONLY, MENU_ENTRY_TEXT } from "./MenuEntryParameters";

export const MENU_LINK: ElementDefinition = {
    type: "menu_link",

    description: "link of a menubar or a menu",

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

        href: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "target of the link",
            required: true
        },

        target: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "browsing context of the link (default: _self)"
        },

        elementSourceIsList: ELEMENT_SOURCE_IS_LIST,
        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: []
};
