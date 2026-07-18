import { ELEMENT_SOURCE, REPETITION_SOURCE } from "../CommonParameters";
import { ElementDefinition, ValueType } from "../ElementDefinitions";
import { ElementTypes } from "../ElementTypes";

export const TABBED: ElementDefinition = {
    type: "tabbed",

    description: "Tabbed container",

    parameters: {
        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: [
    ]
};
