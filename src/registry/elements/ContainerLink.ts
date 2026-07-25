import { ELEMENT_SOURCE, REPETITION_SOURCE } from "../CommonParameters";
import { ATTRIBUTES_PROPERTY, CLASSES_PROPERTY, UID_PROPERTY } from "../CommonProperties";
import { ElementDefinition, ValueType } from "../ElementDefinitions";
import { ElementTypes } from "../ElementTypes";

export const LINK: ElementDefinition = {
    type: "link",

    description: "Link container",

    properties: {
        uid: UID_PROPERTY,
        classes: CLASSES_PROPERTY,
        attributes: ATTRIBUTES_PROPERTY
    },

    parameters: {
        href: {
            type: ValueType.STRING,
            description: "link url",
            required: true
        },

        target: {
            type: ValueType.STRING,
            description: "link open in target",
            enumValues: ["_blank", "_parent", "_self", "_top"]
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
