import { ELEMENT_SOURCE, REPETITION_SOURCE, TOOLTIP } from "../CommonParameters";
import { ElementDefinition, ValueType } from "../ElementDefinitions";

export const SVG_TEXT: ElementDefinition = {
    type: "text",

    description: "SVG text",

    parameters: {
        text: {
            type: ValueType.STRING,
            description: "text",
            required: true
        },

        tooltip: TOOLTIP,

        repetitionSource: REPETITION_SOURCE,
        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: []
};


