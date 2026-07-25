import { ELEMENT_SOURCE, REPETITION_SOURCE, TOOLTIP } from "../CommonParameters";
import { ATTRIBUTES_PROPERTY, CLASSES_PROPERTY, UID_PROPERTY } from "../CommonProperties";
import { ElementDefinition, ValueType } from "../ElementDefinitions";
import { ElementTypes } from "../ElementTypes";

export const INPUT_TEXTBOX: ElementDefinition = {
    type: "textbox",

    description: "element to display text in forms",

    properties: {
        uid: UID_PROPERTY,
        classes: CLASSES_PROPERTY,
        attributes: ATTRIBUTES_PROPERTY
    },

    parameters: {
        value: {
            type: ValueType.STRING,
            description: "front"
        },

        repetitionSource: REPETITION_SOURCE,
        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: []
};
