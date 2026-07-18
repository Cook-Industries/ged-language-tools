import { ELEMENT_SOURCE, REPETITION_SOURCE, TOOLTIP } from "../CommonParameters";
import { ElementDefinition, ValueType } from "../ElementDefinitions";

export const IMAGE: ElementDefinition = {
    type: "image",

    description: "Image",

    parameters: {
        src: {
            type: ValueType.STRING,
            description: "source url",
            required: true
        },

        tooltip: TOOLTIP,

        repetitionSource: REPETITION_SOURCE,
        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: []
};
