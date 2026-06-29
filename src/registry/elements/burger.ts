import { ELEMENT_SOURCE, REPETITION_SOURCE } from "../commonParameters";
import { ElementType } from "../elementTypes";
import { ElementDefinition, ValueType } from "../types";

export const BURGER: ElementDefinition = {
    type: "burger",

    description: "Burger Menu",

    parameters: {
        icon: {
            type: ValueType.STRING,
            description: "icon url"
        },

        repetitionSource: REPETITION_SOURCE,
        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: [
        ElementType.BURGER_ITEM
    ]
};
