import { ELEMENT_SOURCE, INPUT_DISABLED, INPUT_INFO_TEXT, INPUT_INFO_URL, INPUT_NAME, INPUT_ONINPUT, INPUT_SUBMIT_AS, REPETITION_SOURCE, TOOLTIP } from "../CommonParameters";
import { ATTRIBUTES_PROPERTY, CLASSES_PROPERTY, UID_PROPERTY } from "../CommonProperties";
import { ElementDefinition, PropertyKind, ValueType } from "../ElementDefinitions";
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
            type: ValueType.STRING,
            description: "text"
        }
    },

    allowedChildren: []
};
