import { ELEMENT_SOURCE, INPUT_DISABLED, INPUT_INFO_TEXT, INPUT_INFO_URL, INPUT_MANDATORY, INPUT_NAME, INPUT_ONINPUT, INPUT_SUBMIT_AS, ELEMENT_SOURCE_IS_LIST, TOOLTIP, INPUT_NUMBER_MIN, INPUT_NUMBER_MAX, INPUT_NUMBER_STEP } from "../CommonParameters";
import { ATTRIBUTES_PROPERTY, CLASSES_PROPERTY, UID_PROPERTY } from "../CommonProperties";
import { ElementDefinition, ParameterDefinition, PropertyKind, ValueType } from "../ElementDefinitions";
import { ElementTypes } from "../ElementTypes";

const SLIDER_MIN: ParameterDefinition = { ...INPUT_NUMBER_MIN };

const SLIDER_MAX: ParameterDefinition = { ...INPUT_NUMBER_MAX };

const SLIDER_STEP: ParameterDefinition = { ...INPUT_NUMBER_STEP };

const SLIDER_MARKS: ParameterDefinition = {
    kind: PropertyKind.SCALAR,
    type: ValueType.NUMBER,
    description: "number of marks on the scale including both ends, at least 2 (integer, default: one per step, 10 if more than 20 steps)"
};

const SLIDER_CUSTOM_VALUES: ParameterDefinition = {
    kind: PropertyKind.LIST,
    type: ValueType.STRING,
    description: "values to choose from instead of a numeric range, at least two distinct ones (the selected one is submitted)"
};

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

        mandatory: INPUT_MANDATORY,

        disabled: INPUT_DISABLED,

        onInput: INPUT_ONINPUT,

        tooltip: TOOLTIP,

        infoText: INPUT_INFO_TEXT,

        infoUrl: INPUT_INFO_URL,

        elementSourceIsList: ELEMENT_SOURCE_IS_LIST,

        elementSource: ELEMENT_SOURCE,

        value: {
            kind: PropertyKind.SCALAR,
            type: ValueType.NUMBER_OR_STRING,
            description: "value (integer/double, or one of 'customValues' if set)"
        },

        min: SLIDER_MIN,

        max: SLIDER_MAX,

        step: SLIDER_STEP,

        marks: SLIDER_MARKS,

        customValues: SLIDER_CUSTOM_VALUES
    },

    allowedChildren: []
};

SLIDER_MIN.conflictsWith = [SLIDER_CUSTOM_VALUES];
SLIDER_MAX.conflictsWith = [SLIDER_CUSTOM_VALUES];
SLIDER_STEP.conflictsWith = [SLIDER_CUSTOM_VALUES];
SLIDER_MARKS.conflictsWith = [SLIDER_CUSTOM_VALUES];
SLIDER_CUSTOM_VALUES.conflictsWith = [SLIDER_MIN, SLIDER_MAX, SLIDER_STEP, SLIDER_MARKS];
