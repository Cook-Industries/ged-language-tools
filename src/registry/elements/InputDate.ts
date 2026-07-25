import { ELEMENT_SOURCE, REPETITION_SOURCE, TOOLTIP } from "../CommonParameters";
import { ATTRIBUTES_PROPERTY, CLASSES_PROPERTY, UID_PROPERTY } from "../CommonProperties";
import { ElementDefinition, ValueType } from "../ElementDefinitions";
import { ElementTypes } from "../ElementTypes";

export const INPUT_DATE: ElementDefinition = {
    type: "date",

    description: "input field for date",

    properties: {
        uid: UID_PROPERTY,
        classes: CLASSES_PROPERTY,
        attributes: ATTRIBUTES_PROPERTY
    },

    parameters: {
        name: {
            type: ValueType.STRING,
            description: "display name of this field",
            required: true
        },

        submitAs: {
            type: ValueType.STRING,
            description: "submit name of this value on transfer"
        },

        disabled: {
            type: ValueType.BOOLEAN,
            description: "whether this input is active"
        },

        value: {
            type: ValueType.STRING,
            description: "text"
        },

        onInput: {
            type: ValueType.STRING,
            description: "function call to trigger on any input (except enter) press"
        },

        tooltip: TOOLTIP,

        infoText: {
            type: ValueType.STRING,
            description: "text shown in info icon hover"
        },

        infoUrl: {
            type: ValueType.STRING,
            description: "url to call to if info icon is clicked"
        },

        repetitionSource: REPETITION_SOURCE,
        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: []
};
