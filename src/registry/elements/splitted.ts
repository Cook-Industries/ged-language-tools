import { ElementDefinition, ValueType } from "../types";
import { ElementType } from "../elementTypes";
import { Direction } from "../direction";
import { ELEMENT_SOURCE, REPETITION_SOURCE } from "../commonParameters";


export const SPLITTED: ElementDefinition = {
    type: "splitted",

    description: "Generic content container with directional spacing",

    parameters: {
        direction: {
            type: ValueType.STRING,
            description: "direction",
            enumValues: [
                Direction.HORIZONTAL,
                Direction.HORIZONTAL_REVERSE,
                Direction.VERTICAL,
                Direction.VERTICAL_REVERSE
            ]
        },

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
