import { ELEMENT_SOURCE, ELEMENT_SOURCE_IS_LIST, TOOLTIP } from "../CommonParameters";
import { ATTRIBUTES_PROPERTY, CLASSES_PROPERTY, UID_PROPERTY } from "../CommonProperties";
import { ElementDefinition, PropertyKind, ValueType } from "../ElementDefinitions";
import { ElementTypes } from "../ElementTypes";

export const TAB: ElementDefinition = {
    type: "tab",

    description: "Tab of a tabbed container",

    properties: {
        uid: UID_PROPERTY,
        classes: CLASSES_PROPERTY,
        attributes: ATTRIBUTES_PROPERTY
    },

    parameters: {
        name: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "head text",
            required: true
        },

        tooltip: TOOLTIP,

        selected: {
            kind: PropertyKind.SCALAR,
            type: ValueType.BOOLEAN,
            description: "shown on render, only the first enabled tab counts (default: first enabled tab)"
        },

        disabled: {
            kind: PropertyKind.SCALAR,
            type: ValueType.BOOLEAN,
            description: "the head can not be selected (default: false)"
        },

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
