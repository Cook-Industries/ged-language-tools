import { ELEMENT_SOURCE, ELEMENT_SOURCE_IS_LIST, TOOLTIP } from "../CommonParameters";
import { ATTRIBUTES_PROPERTY, CLASSES_PROPERTY, UID_PROPERTY } from "../CommonProperties";
import { ElementDefinition, PropertyKind, ValueType } from "../ElementDefinitions";
import { ElementTypes } from "../ElementTypes";
import { Direction } from "./Direction";

export const CONTENT: ElementDefinition = {
    type: "content",

    description: "Generic content container",

    properties: {
        uid: UID_PROPERTY,
        classes: CLASSES_PROPERTY,
        attributes: ATTRIBUTES_PROPERTY
    },

    parameters: {
        direction: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "direction",
            enumValues: [
                Direction.NONE,
                Direction.HORIZONTAL,
                Direction.VERTICAL,
                Direction.HORIZONTAL_REVERSE,
                Direction.VERTICAL_REVERSE
            ]
        },

        tooltip: TOOLTIP,
        elementSourceIsList: ELEMENT_SOURCE_IS_LIST,
        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: [
        ElementTypes.CONTAINER_AUDIO,
        ElementTypes.CONTAINER_BUTTON,
        ElementTypes.CONTAINER_BURGER,
        ElementTypes.CONTAINER_BUTTON_ICON,
        ElementTypes.CONTAINER_CONTENT,
        ElementTypes.CONTAINER_FORM,
        ElementTypes.CONTAINER_HIDDEN,
        ElementTypes.CONTAINER_IMAGE,
        ElementTypes.CONTAINER_LINK,
        ElementTypes.CONTAINER_SPLITTED,
        ElementTypes.CONTAINER_SVG,
        ElementTypes.CONTAINER_TABBED,
        ElementTypes.CONTAINER_TABLE,
        ElementTypes.CONTAINER_TEXT,
        ElementTypes.CONTAINER_HEADING,
        ElementTypes.CONTROL_COMPONENT
    ]
};
