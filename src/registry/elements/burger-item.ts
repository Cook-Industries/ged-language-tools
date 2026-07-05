import { ELEMENT_SOURCE, REPETITION_SOURCE } from "../commonParameters";
import { ElementType } from "../elementTypes";
import { ElementDefinition, ValueType } from "../types";

export const BURGER_ITEM: ElementDefinition = {
    type: "burger_item",

    description: "Burger Menu Item",

    parameters: {
        text: {
            type: ValueType.STRING,
            description: "text",
            required: true
        },

        url: {
            type: ValueType.STRING,
            description: "request url",
            required: true
        },

        method: {
            type: ValueType.STRING,
            description: "request method",
            enumValues: ["GET", "POST", "DELETE", "PUT", "PATCH"]
        },

        icon: {
            type: ValueType.STRING,
            description: "icon url"
        },

        repetitionSource: REPETITION_SOURCE,
        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: []
};
