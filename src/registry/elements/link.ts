import { ElementDefinition, ValueType } from "../types";
import { ElementType } from "../elementTypes";

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
        }

    },

    allowedChildren: [
        ElementType.IMAGE,
        ElementType.TEXT
    ]
};
