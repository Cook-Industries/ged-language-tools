import { ELEMENT_SOURCE, REPETITION_SOURCE } from "../CommonParameters";
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
        src: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "source url",
            required: true
        },

        newFeature: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "Button text",
            since: "5.0.0"
        },

        controls: {
            kind: PropertyKind.SCALAR,
            type: ValueType.BOOLEAN,
            description: "if controls are shown"
        },

        autoplay: {
            kind: PropertyKind.SCALAR,
            type: ValueType.BOOLEAN,
            description: "autoplay active"
        },

        repetitionSource: REPETITION_SOURCE,
        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: []
};
