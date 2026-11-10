import { ELEMENT_SOURCE, ELEMENT_SOURCE_IS_LIST } from "../CommonParameters";
import { ATTRIBUTES_PROPERTY, CLASSES_PROPERTY, UID_PROPERTY } from "../CommonProperties";
import { ElementDefinition, PropertyKind, ValueType } from "../ElementDefinitions";
import { ElementTypes } from "../ElementTypes";
import { Direction } from "./Direction";

export const MENUBAR: ElementDefinition = {
    type: "menubar",

    description: "bar of menus, links and items like the menubar of a desktop application",

    properties: {
        uid: UID_PROPERTY,
        classes: CLASSES_PROPERTY,
        attributes: ATTRIBUTES_PROPERTY
    },

    parameters: {
        position: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "inline sticks to the top of its scrolling area, the others are fixed to that edge of the window (default: inline)",
            enumValues: [
                "inline",
                "top",
                "bottom",
                "left",
                "right"
            ]
        },

        direction: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "direction of the entries, top and bottom need a horizontal one, left and right a vertical one (default: vertical for left and right, otherwise horizontal)",
            enumValues: [
                Direction.HORIZONTAL,
                Direction.VERTICAL,
                Direction.HORIZONTAL_REVERSE,
                Direction.VERTICAL_REVERSE
            ]
        },

        image: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "source url of an image before the first entry, in the direction of the bar (default: no image)"
        },

        imageAlt: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "text that replaces the image (default: empty)"
        },

        imageHref: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "link target of the image (default: /)"
        },

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
