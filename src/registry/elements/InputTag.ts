import { ELEMENT_SOURCE, INPUT_DISABLED, INPUT_INFO_TEXT, INPUT_INFO_URL, INPUT_MANDATORY, INPUT_NAME, INPUT_SUBMIT_AS, ELEMENT_SOURCE_IS_LIST, TOOLTIP } from "../CommonParameters";
import { ATTRIBUTES_PROPERTY, CLASSES_PROPERTY, UID_PROPERTY } from "../CommonProperties";
import { ElementDefinition, PropertyKind, ValueType } from "../ElementDefinitions";
import { ElementTypes } from "../ElementTypes";

export const INPUT_TAG: ElementDefinition = {
    type: "tag",

    description: "input for tags",

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

        tooltip: TOOLTIP,

        infoText: INPUT_INFO_TEXT,

        infoUrl: INPUT_INFO_URL,

        elementSourceIsList: ELEMENT_SOURCE_IS_LIST,

        elementSource: ELEMENT_SOURCE,

        value: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "comma seperated list of tags"
        },

        pattern: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "regex to which tags must adhere"
        },

        fetchUrl: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "url from which the tags should be fetched"
        },

        searchUrl: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "url from against which searches for autocomplete shoudld happen"
        },

        enforceWhitelist: {
            kind: PropertyKind.SCALAR,
            type: ValueType.BOOLEAN,
            description: "whether or not not white-listed tags are allowed"
        },

        maxTags: {
            kind: PropertyKind.SCALAR,
            type: ValueType.NUMBER,
            description: "how many tags are allowed"
        }
    },

    allowedChildren: [
        ElementTypes.SUBTYPE_INPUT_VALUE
    ]
};
