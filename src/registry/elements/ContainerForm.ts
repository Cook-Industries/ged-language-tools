import { ELEMENT_SOURCE, REPETITION_SOURCE } from "../CommonParameters";
import { ATTRIBUTES_PROPERTY, CLASSES_PROPERTY, UID_PROPERTY } from "../CommonProperties";
import { ElementDefinition, ValueType } from "../ElementDefinitions";
import { ElementTypes } from "../ElementTypes";
import { Direction } from "./Direction";

export const FORM: ElementDefinition = {
    type: "form",

    description: "Form",

    properties: {
        uid: UID_PROPERTY,
        classes: CLASSES_PROPERTY,
        attributes: ATTRIBUTES_PROPERTY
    },

    parameters: {
        connectedBtn: {
            type: ValueType.STRING,
            description: "uid of connected button"
        },

        direction: {
            type: ValueType.STRING,
            description: "direction",
            enumValues: [
                Direction.NONE,
                Direction.HORIZONTAL
            ]
        },

        repetitionSource: REPETITION_SOURCE,
        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: [
        ElementTypes.INPUT_CHECKBOX,
        ElementTypes.INPUT_CURRENCY,
        ElementTypes.INPUT_DATE,
        ElementTypes.INPUT_FILE,
        ElementTypes.INPUT_HIDDEN,
        ElementTypes.INPUT_LINK,
        ElementTypes.INPUT_NUMBER,
        ElementTypes.INPUT_PASSWORD,
        ElementTypes.INPUT_RADIO,
        ElementTypes.INPUT_SELECT,
        ElementTypes.INPUT_SLIDER,
        ElementTypes.INPUT_SWITCH,
        ElementTypes.INPUT_TAG,
        ElementTypes.INPUT_TEXTAREA,
        ElementTypes.INPUT_TEXTBOX,
        ElementTypes.INPUT_TEXTFIELD,
        ElementTypes.CONTROL_COMPONENT
    ]
};
