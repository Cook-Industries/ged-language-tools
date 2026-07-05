import { ElementDefinition, ValueType } from "../types";
import { ElementType } from "../elementTypes";
import { ELEMENT_SOURCE, REPETITION_SOURCE } from "../commonParameters";


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
        ElementType.SVG_GROUP,
        ElementType.SVG_LINE,
        ElementType.SVG_PATH,
        ElementType.SVG_TEXT,
        ElementType.COMPONENT
    ]
};
