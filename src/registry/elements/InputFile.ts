import { ELEMENT_SOURCE, INPUT_DISABLED, INPUT_INFO_TEXT, INPUT_INFO_URL, INPUT_MANDATORY, INPUT_NAME, INPUT_ONINPUT, INPUT_SUBMIT_AS, ELEMENT_SOURCE_IS_LIST, TOOLTIP } from "../CommonParameters";
import { ATTRIBUTES_PROPERTY, CLASSES_PROPERTY, UID_PROPERTY } from "../CommonProperties";
import { ElementDefinition, PropertyKind, ValueType } from "../ElementDefinitions";
import { ElementTypes } from "../ElementTypes";

export const INPUT_FILE: ElementDefinition = {
    type: "file",

    description: "input for file upload",

    properties: {
        uid: UID_PROPERTY,
        classes: CLASSES_PROPERTY,
        attributes: ATTRIBUTES_PROPERTY
    },

    parameters: {
        name: INPUT_NAME,

        submitAs: INPUT_SUBMIT_AS,

        disabled: INPUT_DISABLED,

        mandatory: INPUT_MANDATORY,

        onInput: INPUT_ONINPUT,

        tooltip: TOOLTIP,

        infoText: INPUT_INFO_TEXT,

        infoUrl: INPUT_INFO_URL,

        elementSourceIsList: ELEMENT_SOURCE_IS_LIST,

        elementSource: ELEMENT_SOURCE,

        multiple: {
            kind: PropertyKind.SCALAR,
            type: ValueType.BOOLEAN,
            description: "whether the upload of multiple files is allowed, default: false"
        },

        accept: {
            kind: PropertyKind.LIST,
            type: ValueType.STRING,
            description: "list of allowed file extentions. example: .pdf,.txt,.jpg"
        }
    },

    allowedChildren: []
};
