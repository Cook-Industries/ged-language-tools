import { ELEMENT_SOURCE, ELEMENT_SOURCE_IS_LIST, TOOLTIP } from "../CommonParameters";
import { ATTRIBUTES_PROPERTY, CLASSES_PROPERTY, UID_PROPERTY } from "../CommonProperties";
import { ElementDefinition, PropertyKind, ValueType } from "../ElementDefinitions";
import { ElementTypes } from "../ElementTypes";
import { Direction } from "./Direction";

export const INPUT_GROUP: ElementDefinition = {
    type: "input_group",

    description: "group of inputs of which at least one or exactly one needs a value - submits no value of its own",

    properties: {
        uid: UID_PROPERTY,
        classes: CLASSES_PROPERTY,
        attributes: ATTRIBUTES_PROPERTY
    },

    parameters: {
        name: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "legend of the group",
            required: true
        },

        groupKey: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "key of the markers of the group - differs from the submitAs of its inputs",
            required: true
        },

        mode: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "how many inputs need a value (default: at_least_one)",
            enumValues: [
                "at_least_one",
                "exactly_one"
            ]
        },

        direction: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "direction",
            enumValues: [
                Direction.NONE,
                Direction.HORIZONTAL
            ]
        },

        tooltip: TOOLTIP,

        elementSourceIsList: ELEMENT_SOURCE_IS_LIST,
        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: [
        ElementTypes.INPUT_DATE,
        ElementTypes.INPUT_NUMBER,
        ElementTypes.INPUT_RADIO,
        ElementTypes.INPUT_SELECT,
        ElementTypes.INPUT_TAG,
        ElementTypes.INPUT_TEXTAREA,
        ElementTypes.INPUT_TEXTFIELD,
        ElementTypes.CONTROL_COMPONENT
    ]
};
