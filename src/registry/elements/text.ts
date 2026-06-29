import { ElementDefinition, ValueType } from "../types";
import { ElementType } from "../elementTypes";
import { ELEMENT_SOURCE, REPETITION_SOURCE, TOOLTIP } from "../commonParameters";

export const TEXT: ElementDefinition = {
    type: "text",

    description: "Text container",

    parameters: {
        text: {
            type: ValueType.STRING,
            description: "text",
            required: true
        },

        tooltip: TOOLTIP,

        inline: {
            type: ValueType.BOOLEAN,
            description: "inline"
        },

        repetitionSource: REPETITION_SOURCE,
        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: []
};
