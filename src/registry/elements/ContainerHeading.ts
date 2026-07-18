import { ELEMENT_SOURCE, REPETITION_SOURCE, TOOLTIP } from "../CommonParameters";
import { ElementDefinition, ValueType } from "../ElementDefinitions";

export const HEADING: ElementDefinition = {
    type: "heading",

    description: "Heading container",

    parameters: {
        text: {
            type: ValueType.STRING,
            description: "text",
            required: true
        },

        tooltip: TOOLTIP,

        size: {
            type: ValueType.BOOLEAN,
            description: "inline",
            enumValues: [
                1,
                2,
                3,
                4,
                5,
                6
            ]
        },

        repetitionSource: REPETITION_SOURCE,
        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: []
};
