import { ELEMENT_SOURCE, INPUT_DISABLED, INPUT_INFO_TEXT, INPUT_INFO_URL, INPUT_MANDATORY, INPUT_NAME, INPUT_ON_ENTER_PRESS, INPUT_ONINPUT, INPUT_PLACEHOLDER, INPUT_SUBMIT_AS, REPETITION_SOURCE, TOOLTIP } from "../CommonParameters";
import { ATTRIBUTES_PROPERTY, CLASSES_PROPERTY, UID_PROPERTY } from "../CommonProperties";
import { ElementDefinition, PropertyKind, ValueType } from "../ElementDefinitions";
import { ElementTypes } from "../ElementTypes";

export const INPUT_PASSWORD: ElementDefinition = {
    type: "password",

    description: "input for passwords",

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

        placeholder: INPUT_PLACEHOLDER,

        onEnterPress: INPUT_ON_ENTER_PRESS,

        tooltip: TOOLTIP,

        infoText: INPUT_INFO_TEXT,

        infoUrl: INPUT_INFO_URL,

        repetitionSource: REPETITION_SOURCE,

        elementSource: ELEMENT_SOURCE,
    },

    allowedChildren: []
};
