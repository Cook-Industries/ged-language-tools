import { ELEMENT_SOURCE, REPETITION_SOURCE, TOOLTIP } from "../CommonParameters";
import { ATTRIBUTES_PROPERTY, CLASSES_PROPERTY, UID_PROPERTY } from "../CommonProperties";
import { ElementDefinition, PropertyKind, ValueType } from "../ElementDefinitions";

export const HEADING: ElementDefinition = {
    type: "heading",

    description: "Heading container",

    properties: {
        uid: UID_PROPERTY,
        classes: CLASSES_PROPERTY,
        attributes: ATTRIBUTES_PROPERTY
    },

    parameters: {
        text: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "text",
            required: true
        },

        tooltip: TOOLTIP,

        size: {
            kind: PropertyKind.SCALAR,
            type: ValueType.BOOLEAN,
            description: "inline",
            enumValues: [
                1,
                2,
                3,
                4,
                5,
                6
            ]
        },

        repetitionSource: REPETITION_SOURCE,
        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: []
};
