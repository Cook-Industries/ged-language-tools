import { ELEMENT_SOURCE, REPETITION_SOURCE, TOOLTIP } from "../CommonParameters";
import { ATTRIBUTES_PROPERTY, CLASSES_PROPERTY, UID_PROPERTY } from "../CommonProperties";
import { ElementDefinition, ValueType } from "../ElementDefinitions";
import { ElementTypes } from "../ElementTypes";

export const INPUT_LINK: ElementDefinition = {
    type: "link",

    description: "link to use in forms",

    properties: {
        uid: UID_PROPERTY,
        classes: CLASSES_PROPERTY,
        attributes: ATTRIBUTES_PROPERTY
    },

    parameters: {
        text: {
            type: ValueType.STRING,
            description: "clickable text",
            required: true
        },

        href: {
            type: ValueType.STRING,
            description: "url to activate on click",
            required: true
        },

        target: {
            type: ValueType.BOOLEAN,
            description: "link open in target",
            enumValues: ["_blank", "_parent", "_self", "_top"]
        },

        tooltip: TOOLTIP,

        repetitionSource: REPETITION_SOURCE,
        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: []
};
