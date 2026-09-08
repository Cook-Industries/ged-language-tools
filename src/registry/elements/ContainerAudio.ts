import { ELEMENT_SOURCE, ELEMENT_SOURCE_IS_LIST, TOOLTIP } from "../CommonParameters";
import { ATTRIBUTES_PROPERTY, CLASSES_PROPERTY, UID_PROPERTY } from "../CommonProperties";
import { ElementDefinition, PropertyKind, ValueType } from "../ElementDefinitions";

export const AUDIO: ElementDefinition = {
    type: "audio",

    description: "Audio",

    properties: {
        uid: UID_PROPERTY,
        classes: CLASSES_PROPERTY,
        attributes: ATTRIBUTES_PROPERTY
    },

    parameters: {
        caption: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "caption to describe this audio element",
            required: true
        },

        src: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "source url",
            required: true
        },

        controls: {
            kind: PropertyKind.SCALAR,
            type: ValueType.BOOLEAN,
            description: "should controls show (default: true)"
        },

        autoplay: {
            kind: PropertyKind.SCALAR,
            type: ValueType.BOOLEAN,
            description: "autoplay active (default: false)"
        },

        tooltip: TOOLTIP,

        elementSourceIsList: ELEMENT_SOURCE_IS_LIST,
        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: []
};
