import { ELEMENT_SOURCE, REPETITION_SOURCE } from "../CommonParameters";
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

        btnClass: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "Button text",
            enumValues: [
                "default",
                "primary",
                "secondary",
                "sucess",
                "warning",
                "error",
                "danger",
                "info",
                "light",
                "dark",
                "link",
                "custom"
            ]
        },

        tooltip: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "onhover tooltip"
        },

        repetitionSource: REPETITION_SOURCE,
        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: []
};
