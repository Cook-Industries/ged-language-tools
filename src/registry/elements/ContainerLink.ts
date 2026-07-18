import { ELEMENT_SOURCE, REPETITION_SOURCE } from "../CommonParameters";
import { ElementDefinition, ValueType } from "../ElementDefinitions";
import { ElementTypes } from "../ElementTypes";

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
        ElementTypes.CONTAINER_IMAGE,
        ElementTypes.CONTAINER_TEXT,
        ElementTypes.CONTROL_COMPONENT
    ]
};
