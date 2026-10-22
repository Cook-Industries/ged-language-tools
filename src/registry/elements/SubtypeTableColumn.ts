import { ELEMENT_SOURCE, ELEMENT_SOURCE_IS_LIST, TOOLTIP } from "../CommonParameters";
import { ATTRIBUTES_PROPERTY, CLASSES_PROPERTY, UID_PROPERTY } from "../CommonProperties";
import { ElementDefinition, PropertyKind, ValueType } from "../ElementDefinitions";

export const TABLE_COLUMN: ElementDefinition = {
    type: "table_column",

    description: "Table column",

    properties: {
        uid: UID_PROPERTY,
        classes: CLASSES_PROPERTY,
        attributes: ATTRIBUTES_PROPERTY
    },

    parameters: {
        name: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "header text",
            required: true
        },

        sortable: {
            kind: PropertyKind.SCALAR,
            type: ValueType.BOOLEAN,
            description: "rows can be sorted by this column (default: false)"
        },

        sortType: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "comparison of the values: locale aware text with numeric digit sequences or decimal number (default: TEXT)",
            enumValues: ["TEXT", "NUMBER"]
        },

        sortBy: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "name of the data attribute to sort by, looked up in the cell and then on the row (default: cell text)"
        },

        defaultSort: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "sorting on render, only the first sortable column with a default sort is used (default: NONE)",
            enumValues: ["NONE", "ASC", "DESC"]
        },

        tooltip: TOOLTIP,

        elementSourceIsList: ELEMENT_SOURCE_IS_LIST,

        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: []
};
