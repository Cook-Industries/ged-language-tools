import { ELEMENT_SOURCE, REPETITION_SOURCE } from "../CommonParameters";
import { ElementDefinition, ValueType } from "../ElementDefinitions";
import { ElementTypes } from "../ElementTypes";

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
        ElementTypes.SUBTYPE_BURGER_ITEM,
        ElementTypes.CONTROL_COMPONENT
    ]
};
