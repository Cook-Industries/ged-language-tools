import { ELEMENT_SOURCE, REPETITION_SOURCE } from "../CommonParameters";
import { ATTRIBUTES_PROPERTY, CLASSES_PROPERTY, UID_PROPERTY } from "../CommonProperties";
import { ElementDefinition, PropertyKind, ValueType } from "../ElementDefinitions";
import { ElementTypes } from "../ElementTypes";

export const BURGER_ITEM: ElementDefinition = {
    type: "burger_item",

    description: "Burger Menu Item",

    properties: {
        uid: UID_PROPERTY,
        classes: CLASSES_PROPERTY,
        attributes: ATTRIBUTES_PROPERTY
    },

    parameters: {
        text: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "text",
            required: true
        },

        url: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "request url",
            required: true
        },

        method: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "request method",
            enumValues: ["GET", "POST", "DELETE", "PUT", "PATCH"]
        },

        icon: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "icon url"
        },

        repetitionSource: REPETITION_SOURCE,

        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: []
};
