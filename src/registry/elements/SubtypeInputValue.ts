import { ELEMENT_SOURCE, REPETITION_SOURCE } from "../CommonParameters";
import { ATTRIBUTES_PROPERTY, CLASSES_PROPERTY, UID_PROPERTY } from "../CommonProperties";
import { ElementDefinition, PropertyKind, ValueType } from "../ElementDefinitions";
import { ElementTypes } from "../ElementTypes";

export const INPUT_VALUE: ElementDefinition = {
    type: "input_value",

    description: "input value field",

    properties: {
        uid: UID_PROPERTY,
        classes: CLASSES_PROPERTY
    },

    parameters: {
        id: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "sendable unique id of this element"
        },

        text: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "text of this element"
        },

        value: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "value of this element if applicable",
        },

        checked: {
            kind: PropertyKind.SCALAR,
            type: ValueType.BOOLEAN,
            description: "if this element is selected if applicable"
        },

        repetitionSource: REPETITION_SOURCE,

        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: []
};
