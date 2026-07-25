import { ELEMENT_SOURCE, REPETITION_SOURCE, TOOLTIP } from "../CommonParameters";
import { ATTRIBUTES_PROPERTY, CLASSES_PROPERTY, UID_PROPERTY } from "../CommonProperties";
import { ElementDefinition, ValueType } from "../ElementDefinitions";
import { ElementTypes } from "../ElementTypes";

export const INPUT_NUMBER: ElementDefinition = {
    type: "number",

    description: "input field for numbers",

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

        valueF: {
            type: ValueType.NUMBER,
            description: "front value"
        },

        min: {
            type: ValueType.NUMBER,
            description: "minimal valueF"
        },

        max: {
            type: ValueType.NUMBER,
            description: "maximal valueF"
        },

        placeholder: {
            type: ValueType.STRING,
            description: "placeholder for valueF"
        },

        prefix: {
            type: ValueType.STRING,
            description: "prefix text to show"
        },

        suffix: {
            type: ValueType.STRING,
            description: "suffix text to show"
        },

        onInput: {
            type: ValueType.STRING,
            description: "function call to trigger on any input (except enter) press"
        },

        onEnterPress: {
            type: ValueType.STRING,
            description: "function call to trigger on enter press"
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
