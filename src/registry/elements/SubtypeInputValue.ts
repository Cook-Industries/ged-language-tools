import { ELEMENT_SOURCE, ELEMENT_SOURCE_IS_LIST } from "../CommonParameters";
import { ATTRIBUTES_PROPERTY, CLASSES_PROPERTY, UID_PROPERTY } from "../CommonProperties";
import { ElementDefinition, PropertyKind, ValueType } from "../ElementDefinitions";
import { ElementTypes } from "../ElementTypes";

export const INPUT_VALUE: ElementDefinition = {
    type: "input_value",

    description: "input value field",

    properties: {
        uid: UID_PROPERTY,
        classes: CLASSES_PROPERTY
    },

    parameters: {
        uid: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "unique id of this element under which it gets send if applicable",
            required: true
        },

        text: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "text of this element",
            required: true
        },

        value: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "value of this element if applicable",
        },

        checked: {
            kind: PropertyKind.SCALAR,
            type: ValueType.BOOLEAN,
            description: "if this element is selected if applicable"
        },

        elementSourceIsList: ELEMENT_SOURCE_IS_LIST,

        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: []
};
