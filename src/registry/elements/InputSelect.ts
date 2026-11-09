import { ELEMENT_SOURCE, INPUT_DISABLED, INPUT_INFO_TEXT, INPUT_INFO_URL, INPUT_MANDATORY, INPUT_NAME, INPUT_ONINPUT, INPUT_SUBMIT_AS, ELEMENT_SOURCE_IS_LIST, TOOLTIP } from "../CommonParameters";
import { ATTRIBUTES_PROPERTY, CLASSES_PROPERTY, UID_PROPERTY } from "../CommonProperties";
import { ElementDefinition, PropertyKind, ValueType } from "../ElementDefinitions";
import { ElementTypes } from "../ElementTypes";

export const INPUT_SELECT: ElementDefinition = {
    type: "select",

    description: "input for dropdown select",

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
            type: ValueType.STRING,
            description: "the currently selected child - leave empty if none selected"
        },

        values: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "name of a InputValueList source or if emtpy use children of this element"
        },

        placeholder: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "text of an option with an empty value before the options - selected if value matches no option"
        }
    },

    allowedChildren: [
        ElementTypes.SUBTYPE_INPUT_VALUE
    ]
};
