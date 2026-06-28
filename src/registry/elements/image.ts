import { ElementDefinition, ValueType } from "../types";

export const IMAGE: ElementDefinition = {
    type: "image",

    description: "Image",

    parameters: {
        src: {
            type: ValueType.STRING,
            description: "source url",
            required: true
        },

        tooltip: {
            type: ValueType.BOOLEAN,
            description: "onhover tooltip"
        }
    },

    allowedChildren: []
};
