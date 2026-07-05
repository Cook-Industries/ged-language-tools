import { ElementDefinition, ValueType } from "../types";
import { ElementType } from "../elementTypes";
import { ELEMENT_SOURCE, REPETITION_SOURCE } from "../commonParameters";

export const LINK: ElementDefinition = {
    type: "link",

    description: "Link container",

    parameters: {
        href: {
            type: ValueType.STRING,
            description: "link url",
            required: true
        },

        target: {
            type: ValueType.STRING,
            description: "link open target"
        },

        repetitionSource: REPETITION_SOURCE,
        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: [
        ElementType.IMAGE,
        ElementType.TEXT,
        ElementType.COMPONENT
    ]
};
