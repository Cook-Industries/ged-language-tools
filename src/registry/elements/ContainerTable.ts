import { ELEMENT_SOURCE, ELEMENT_SOURCE_IS_LIST } from "../CommonParameters";
import { ATTRIBUTES_PROPERTY, CLASSES_PROPERTY, UID_PROPERTY } from "../CommonProperties";
import { ElementDefinition, PropertyKind, ValueType } from "../ElementDefinitions";
import { ElementTypes } from "../ElementTypes";

export const TABLE: ElementDefinition = {
    type: "table",

    description: "Table container",

    properties: {
        uid: UID_PROPERTY,
        classes: CLASSES_PROPERTY,
        attributes: ATTRIBUTES_PROPERTY
    },

    parameters: {
        name: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "name",
            required: true
        },

        striped: {
            kind: PropertyKind.SCALAR,
            type: ValueType.BOOLEAN,
            description: "every second row is highlighted (default: false)"
        },

        elementSourceIsList: ELEMENT_SOURCE_IS_LIST,
        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: [
        ElementTypes.SUBTYPE_TABLE_COLUMN,
        ElementTypes.SUBTYPE_TABLE_ROW,
        ElementTypes.CONTROL_COMPONENT
    ]
};
