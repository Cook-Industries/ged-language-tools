import { ElementDefinition, ValueType } from "../types";
import { ElementType } from "../elementTypes";
import { ELEMENT_SOURCE, REPETITION_SOURCE } from "../commonParameters";

export const CONTENT: ElementDefinition = {
    type: "content",

    description: "Generic content container",

    parameters: {
        repetitionSource: REPETITION_SOURCE,
        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: [
        ElementType.AUDIO,
        ElementType.BUTTON,
        ElementType.BURGER,
        ElementType.BUTTON_BAR,
        ElementType.BUTTON_ICON,
        ElementType.CONTENT,
        ElementType.FORM,
        ElementType.HIDDEN,
        ElementType.IMAGE,
        ElementType.LINK,
        ElementType.SPLITTED,
        ElementType.SVG,
        ElementType.TAB,
        ElementType.TABLE,
        ElementType.TEXT,
        ElementType.HEADING,
        ElementType.EMPTY
    ]
};
