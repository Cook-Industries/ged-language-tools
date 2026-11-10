import { ELEMENT_SOURCE, ELEMENT_SOURCE_IS_LIST } from "../CommonParameters";
import { ATTRIBUTES_PROPERTY, CLASSES_PROPERTY, UID_PROPERTY } from "../CommonProperties";
import { ElementDefinition } from "../ElementDefinitions";
import { ElementTypes } from "../ElementTypes";
import { MENU_ENTRY_END, MENU_ENTRY_ICON, MENU_ENTRY_ICON_ONLY, MENU_ENTRY_TEXT } from "./MenuEntryParameters";

export const MENU: ElementDefinition = {
    type: "menu",

    description: "menu of a menubar or a menu, opens its entries in a dropdown - in the bar on click, in a dropdown on hover",

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

        elementSourceIsList: ELEMENT_SOURCE_IS_LIST,
        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: [
        ElementTypes.SUBTYPE_MENU,
        ElementTypes.SUBTYPE_MENU_LINK,
        ElementTypes.SUBTYPE_MENU_ITEM,
        ElementTypes.SUBTYPE_MENU_SEPARATOR,
        ElementTypes.CONTROL_COMPONENT
    ]
};
