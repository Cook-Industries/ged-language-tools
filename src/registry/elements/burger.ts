import { ElementType } from "../elementTypes";
import { ElementDefinition, ValueType } from "../types";

export const BURGER: ElementDefinition = {
    type: "burger",

    description: "Burger Menu",

    parameters: {
        icon: {
            type: ValueType.STRING,
            description: "icon url"
        }
    },

    allowedChildren: [
        ElementType.BURGER_ITEM
    ]
};
