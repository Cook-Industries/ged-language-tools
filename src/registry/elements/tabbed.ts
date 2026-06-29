import { ElementDefinition, ValueType } from "../types";
import { ElementType } from "../elementTypes";
import { ELEMENT_SOURCE } from "../commonParameters";

export const TABBED: ElementDefinition = {
    type: "tabbed",

    description: "Tabbed container",

    parameters: {
        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: [
    ]
};
