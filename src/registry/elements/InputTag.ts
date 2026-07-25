import { ELEMENT_SOURCE, REPETITION_SOURCE, TOOLTIP } from "../CommonParameters";
import { ATTRIBUTES_PROPERTY, CLASSES_PROPERTY, UID_PROPERTY } from "../CommonProperties";
import { ElementDefinition, ValueType } from "../ElementDefinitions";
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
            description: "comma seperated list of tags"
        },

        pattern: {
            type: ValueType.STRING,
            description: "regex to which tags must adhere"
        },

        fetchUrl: {
            type: ValueType.STRING,
            description: "url from which the tags should be fetched"
        },

        searchUrl: {
            type: ValueType.STRING,
            description: "url from against which searches for autocomplete shoudld happen"
        },

        enforceWhitelist: {
            type: ValueType.BOOLEAN,
            description: "whether or not not white-listed tags are allowed"
        },

        maxTags: {
            type: ValueType.NUMBER,
            description: "how many tags are allowed"
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

    allowedChildren: [
        ElementTypes.SUBTYPE_INPUT_VALUE
    ]
};
