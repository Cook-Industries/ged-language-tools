import { ELEMENT_SOURCE, REPETITION_SOURCE } from "../CommonParameters";
import { ElementDefinition, ValueType } from "../ElementDefinitions";
import { ElementTypes } from "../ElementTypes";

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
        ElementTypes.SUBTYPE_TABLE_ROW,
        ElementTypes.CONTROL_COMPONENT
    ]
};
