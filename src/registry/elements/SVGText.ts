import { ELEMENT_SOURCE, REPETITION_SOURCE, TOOLTIP } from "../CommonParameters";
import { ATTRIBUTES_PROPERTY, CLASSES_PROPERTY, UID_PROPERTY } from "../CommonProperties";
import { ElementDefinition, PropertyKind, ValueType } from "../ElementDefinitions";

export const SVG_TEXT: ElementDefinition = {
    type: "text",

    description: "SVG text",

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

        repetitionSource: REPETITION_SOURCE,

        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: []
};


