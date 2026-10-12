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
        src: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "source url",
            required: true
        },

        caption: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "caption to describe this audio element",
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

        loop: {
            kind: PropertyKind.SCALAR,
            type: ValueType.BOOLEAN,
            description: "track should be looped (default: false)"
        },

        muted: {
            kind: PropertyKind.SCALAR,
            type: ValueType.BOOLEAN,
            description: "initial volume level is zero  (default: false)"
        },

        preload: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "autoplay active (default: auto)",
            enumValues: ["none", "metadata", "auto"]
        },

        tooltip: TOOLTIP,

        elementSourceIsList: ELEMENT_SOURCE_IS_LIST,
        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: []
};
