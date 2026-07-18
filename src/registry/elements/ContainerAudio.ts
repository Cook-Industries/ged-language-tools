import { ELEMENT_SOURCE, REPETITION_SOURCE } from "../CommonParameters";
import { ElementDefinition, ValueType } from "../ElementDefinitions";

export const AUDIO: ElementDefinition = {
    type: "audio",

    description: "Audio",

    parameters: {
        src: {
            type: ValueType.STRING,
            description: "source url",
            required: true
        },

        controls: {
            type: ValueType.BOOLEAN,
            description: "if controls are shown",
            required: true
        },

        autoplay: {
            type: ValueType.BOOLEAN,
            description: "autoplay active",
            required: true
        },

        repetitionSource: REPETITION_SOURCE,
        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: []
};
