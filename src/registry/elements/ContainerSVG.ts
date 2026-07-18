import { ELEMENT_SOURCE, REPETITION_SOURCE } from "../CommonParameters";
import { ElementDefinition, ValueType } from "../ElementDefinitions";
import { ElementTypes } from "../ElementTypes";

export const SVG: ElementDefinition = {
    type: "svg",

    description: "Generic svg container",

    parameters: {
        width: {
            type: ValueType.NUMBER,
            description: "width"
        },

        height: {
            type: ValueType.NUMBER,
            description: "height"
        },

        repetitionSource: REPETITION_SOURCE,
        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: [
        // ElementTypes.SVG_GROUP,
        // ElementTypes.SVG_LINE,
        // ElementTypes.SVG_PATH,
        ElementTypes.SVG_TEXT,
        ElementTypes.CONTROL_COMPONENT
    ]
};
