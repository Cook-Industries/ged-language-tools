import { ELEMENT_SOURCE, INPUT_DISABLED, INPUT_INFO_TEXT, INPUT_INFO_URL, INPUT_NAME, INPUT_ONINPUT, INPUT_SUBMIT_AS, REPETITION_SOURCE, TOOLTIP } from "../CommonParameters";
import { ATTRIBUTES_PROPERTY, CLASSES_PROPERTY, UID_PROPERTY } from "../CommonProperties";
import { ElementDefinition, PropertyKind, ValueType } from "../ElementDefinitions";
import { ElementTypes } from "../ElementTypes";

export const INPUT_SLIDER: ElementDefinition = {
    type: "slider",

    description: "input field for slider",

    properties: {
        uid: UID_PROPERTY,
        classes: CLASSES_PROPERTY,
        attributes: ATTRIBUTES_PROPERTY
    },

    parameters: {
        name: INPUT_NAME,

        submitAs: INPUT_SUBMIT_AS,

        disabled: INPUT_DISABLED,

        onInput: INPUT_ONINPUT,

        tooltip: TOOLTIP,

        infoText: INPUT_INFO_TEXT,

        infoUrl: INPUT_INFO_URL,

        repetitionSource: REPETITION_SOURCE,

        elementSource: ELEMENT_SOURCE,


        value: {
            kind: PropertyKind.SCALAR,
            type: ValueType.NUMBER,
            description: "current value"
        },

        min: {
            kind: PropertyKind.SCALAR,
            type: ValueType.NUMBER,
            description: "minimal value"
        },

        max: {
            kind: PropertyKind.SCALAR,
            type: ValueType.NUMBER,
            description: "maximal value"
        }
    },

    allowedChildren: []
};
