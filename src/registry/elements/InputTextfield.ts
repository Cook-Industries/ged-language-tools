import { ELEMENT_SOURCE, INPUT_DISABLED, INPUT_INFO_TEXT, INPUT_INFO_URL, INPUT_MANDATORY, INPUT_NAME, INPUT_ON_ENTER_PRESS, INPUT_ONINPUT, INPUT_PLACEHOLDER, INPUT_SUBMIT_AS, ELEMENT_SOURCE_IS_LIST, TOOLTIP } from "../CommonParameters";
import { ATTRIBUTES_PROPERTY, CLASSES_PROPERTY, UID_PROPERTY } from "../CommonProperties";
import { ElementDefinition, PropertyKind, ValueType } from "../ElementDefinitions";
import { ElementTypes } from "../ElementTypes";

export const INPUT_TEXTFIELD: ElementDefinition = {
    type: "textfield",

    description: "input for a single line text",

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

        onKeydown: {
            kind: PropertyKind.SCALAR,
            type: ValueType.FUNCTION,
            description: "function call to trigger on any key press"
        },

        tooltip: TOOLTIP,

        infoText: INPUT_INFO_TEXT,

        infoUrl: INPUT_INFO_URL,

        elementSourceIsList: ELEMENT_SOURCE_IS_LIST,

        elementSource: ELEMENT_SOURCE,

        value: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "text"
        },

        pattern: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "regex pattern to apply to this input"
        },

        maxChars: {
            kind: PropertyKind.SCALAR,
            type: ValueType.NUMBER,
            description: "maximal allowed chars"
        }
    },

    allowedChildren: []
};
