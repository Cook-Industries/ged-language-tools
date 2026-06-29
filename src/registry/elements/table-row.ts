import { ElementDefinition, ValueType } from "../types";
import { ElementType } from "../elementTypes";
import { ELEMENT_SOURCE, REPETITION_SOURCE } from "../commonParameters";

export const TABLE_ROW: ElementDefinition = {
    type: "table_row",

    description: "Table row container",

    parameters: {
        tableName: {
            type: ValueType.STRING,
            description: "name of parent table",
            required: true
        },

        repetitionSource: REPETITION_SOURCE,
        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: [
        ElementType.BUTTON,
        ElementType.BURGER,
        ElementType.BUTTON_BAR,
        ElementType.BUTTON_ICON,
        ElementType.CONTENT,
        ElementType.HIDDEN,
        ElementType.IMAGE,
        ElementType.LINK,
        ElementType.SPLITTED,
        ElementType.SVG,
        ElementType.TEXT,
        ElementType.EMPTY
    ]
};
