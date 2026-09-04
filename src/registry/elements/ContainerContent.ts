import { ELEMENT_SOURCE, ELEMENT_SOURCE_IS_LIST } from "../CommonParameters";
import { ATTRIBUTES_PROPERTY, CLASSES_PROPERTY, UID_PROPERTY } from "../CommonProperties";
import { ElementDefinition } from "../ElementDefinitions";
import { ElementTypes } from "../ElementTypes";

export const CONTENT: ElementDefinition = {
    type: "content",

    description: "Generic content container",

    properties: {
        uid: UID_PROPERTY,
        classes: CLASSES_PROPERTY,
        attributes: ATTRIBUTES_PROPERTY
    },

    parameters: {
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
        ElementTypes.CONTAINER_TABLE,
        ElementTypes.CONTAINER_TEXT,
        ElementTypes.CONTAINER_HEADING,
        ElementTypes.CONTROL_COMPONENT
    ]
};
