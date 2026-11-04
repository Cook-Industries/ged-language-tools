import { ELEMENT_SOURCE, ELEMENT_SOURCE_IS_LIST, TOOLTIP } from "../CommonParameters";
import { ATTRIBUTES_PROPERTY, CLASSES_PROPERTY, UID_PROPERTY } from "../CommonProperties";
import { ElementDefinition, PropertyKind, ValueType } from "../ElementDefinitions";

export const IMAGE: ElementDefinition = {
    type: "image",

    description: "Image",

    properties: {
        uid: UID_PROPERTY,
        classes: CLASSES_PROPERTY,
        attributes: ATTRIBUTES_PROPERTY
    },

    parameters: {
        src: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "source url",
            required: true
        },

        alt: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "text that replaces the image, empty marks it as decorative"
        },

        tooltip: TOOLTIP,
        elementSourceIsList: ELEMENT_SOURCE_IS_LIST,
        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: []
};
