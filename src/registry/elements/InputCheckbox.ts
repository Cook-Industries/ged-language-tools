import { ELEMENT_SOURCE, INPUT_DISABLED, INPUT_INFO_TEXT, INPUT_INFO_URL, INPUT_NAME, INPUT_ONINPUT, INPUT_SUBMIT_AS, INPUT_MANDATORY, REPETITION_SOURCE, TOOLTIP } from "../CommonParameters";
import { ATTRIBUTES_PROPERTY, CLASSES_PROPERTY, UID_PROPERTY } from "../CommonProperties";
import { ElementDefinition, PropertyKind, ValueType } from "../ElementDefinitions";
import { ElementTypes } from "../ElementTypes";

export const INPUT_CHECKBOX: ElementDefinition = {
    type: "checkbox",

    description: "input for checkboxes",

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

        repetitionSource: REPETITION_SOURCE,

        elementSource: ELEMENT_SOURCE,

        boxes: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "name of a InputValueList source or if emtpy use children of this element"
        }
    },

    allowedChildren: [
        ElementTypes.SUBTYPE_INPUT_VALUE
    ]
};
