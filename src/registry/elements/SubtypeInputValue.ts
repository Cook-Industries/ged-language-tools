import { ELEMENT_SOURCE, REPETITION_SOURCE } from "../CommonParameters";
import { ATTRIBUTES_PROPERTY, CLASSES_PROPERTY, UID_PROPERTY } from "../CommonProperties";
import { ElementDefinition, ValueType } from "../ElementDefinitions";
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
            type: ValueType.STRING,
            description: "sendable unique id of this element"
        },

        text: {
            type: ValueType.STRING,
            description: "text of this element"
        },

        value: {
            type: ValueType.STRING,
            description: "value of this element if applicable",
        },

        checked: {
            type: ValueType.BOOLEAN,
            description: "if this element is selected if applicable"
        },

        repetitionSource: REPETITION_SOURCE,
        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: []
};
