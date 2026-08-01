import { ELEMENT_SOURCE, REPETITION_SOURCE } from "../CommonParameters";
import { ATTRIBUTES_PROPERTY, CLASSES_PROPERTY, UID_PROPERTY } from "../CommonProperties";
import { ElementDefinition, PropertyKind, ValueType } from "../ElementDefinitions";

export const BUTTON: ElementDefinition = {
    type: "button",

    description: "Button",

    properties: {
        uid: UID_PROPERTY,
        classes: CLASSES_PROPERTY,
        attributes: ATTRIBUTES_PROPERTY
    },

    parameters: {
        text: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "Button text",
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

        repetitionSource: REPETITION_SOURCE,
        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: []
};
