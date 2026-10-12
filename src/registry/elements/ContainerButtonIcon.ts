import { BTN_CLASS, ELEMENT_SOURCE, ELEMENT_SOURCE_IS_LIST, TOOLTIP } from "../CommonParameters";
import { ATTRIBUTES_PROPERTY, CLASSES_PROPERTY, UID_PROPERTY } from "../CommonProperties";
import { ElementDefinition, PropertyKind, ValueType } from "../ElementDefinitions";

export const BUTTON_ICON: ElementDefinition = {
    type: "button_icon",

    description: "Button",

    properties: {
        uid: UID_PROPERTY,
        classes: CLASSES_PROPERTY,
        attributes: ATTRIBUTES_PROPERTY
    },

    parameters: {
        icon: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "icon name",
            required: true
        },

        onClick: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "onClick function",
            required: true
        },

        alt: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "accessible name of the icon button"
        },

        btnClass: BTN_CLASS,

        tooltip: TOOLTIP,

        elementSourceIsList: ELEMENT_SOURCE_IS_LIST,
        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: []
};
