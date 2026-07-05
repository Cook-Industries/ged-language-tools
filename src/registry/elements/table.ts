import { ElementDefinition, ValueType } from "../types";
import { ElementType } from "../elementTypes";
import { ELEMENT_SOURCE, REPETITION_SOURCE } from "../commonParameters";

export const TABLE: ElementDefinition = {
    type: "table",

    description: "Table container",

    parameters: {
        name: {
            type: ValueType.STRING,
            description: "name",
            required: true
        },

        columnNames: {
            type: ValueType.STRING,
            description: "column names splitted by '||'",
            required: true
        },

        sortable: {
            type: ValueType.BOOLEAN,
            description: "sortable"
        },

        repetitionSource: REPETITION_SOURCE,
        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: [
        ElementType.TABLE_ROW,
        ElementType.COMPONENT
    ]
};
