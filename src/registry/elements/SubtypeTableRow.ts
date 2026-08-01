import { ELEMENT_SOURCE, REPETITION_SOURCE } from "../CommonParameters";
import { ATTRIBUTES_PROPERTY, CLASSES_PROPERTY, UID_PROPERTY } from "../CommonProperties";
import { ElementDefinition, PropertyKind, ValueType } from "../ElementDefinitions";
import { ElementTypes } from "../ElementTypes";

export const TABLE_ROW: ElementDefinition = {
    type: "table_row",

    description: "Table row container",

    properties: {
        uid: UID_PROPERTY,
        classes: CLASSES_PROPERTY,
        attributes: ATTRIBUTES_PROPERTY
    },

    parameters: {
        tableName: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "name of parent table",
            required: true
        },

        repetitionSource: REPETITION_SOURCE,

        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: [
        ElementTypes.CONTAINER_BUTTON,
        ElementTypes.CONTAINER_BURGER,
        ElementTypes.CONTAINER_BUTTON_ICON,
        ElementTypes.CONTAINER_CONTENT,
        ElementTypes.CONTAINER_HIDDEN,
        ElementTypes.CONTAINER_IMAGE,
        ElementTypes.CONTAINER_LINK,
        ElementTypes.CONTAINER_SPLITTED,
        ElementTypes.CONTAINER_SVG,
        ElementTypes.CONTAINER_TEXT,
        ElementTypes.CONTROL_COMPONENT
    ]
};
