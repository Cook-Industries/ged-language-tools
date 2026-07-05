import { ELEMENT_SOURCE, REPETITION_SOURCE } from "../commonParameters";
import { ElementType } from "../elementTypes";
import { ElementDefinition, ValueType } from "../types";

export const FORM: ElementDefinition = {
    type: "form",

    description: "Form",

    parameters: {
        text: {
            type: ValueType.STRING,
            description: "Button text",
            required: true
        },

        connectedBtn: {
            type: ValueType.STRING,
            description: "uid of connected button"
        },

        direction: {
            type: ValueType.STRING,
            description: "direction",
            enumValues: [
                "none",
                "horizontal"
            ]
        },

        repetitionSource: REPETITION_SOURCE,
        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: [
        ElementType.INPUT_CHECKBOX,
        ElementType.INPUT_CURRENCY,
        ElementType.INPUT_DATE,
        ElementType.INPUT_FILE,
        ElementType.INPUT_HIDDEN,
        ElementType.INPUT_LINK,
        ElementType.INPUT_NUMBER,
        ElementType.INPUT_PASSWORD,
        ElementType.INPUT_RADIO,
        ElementType.INPUT_SELECT,
        ElementType.INPUT_SLIDER,
        ElementType.INPUT_SWITCH,
        ElementType.INPUT_TAG,
        ElementType.INPUT_TEXTAREA,
        ElementType.INPUT_TEXTBOX,
        ElementType.INPUT_TEXTFIELD,
        ElementType.COMPONENT
    ]
};
