import { ELEMENT_SOURCE, ELEMENT_SOURCE_IS_LIST } from "../CommonParameters";
import { ATTRIBUTES_PROPERTY, CLASSES_PROPERTY, UID_PROPERTY } from "../CommonProperties";
import { ElementDefinition, PropertyKind, ValueType } from "../ElementDefinitions";
import { ElementTypes } from "../ElementTypes";

export const SVG: ElementDefinition = {
    type: "svg",

    description: "Generic svg container",

    properties: {
        uid: UID_PROPERTY,
        classes: CLASSES_PROPERTY,
        attributes: ATTRIBUTES_PROPERTY
    },

    parameters: {
        width: {
            kind: PropertyKind.SCALAR,
            type: ValueType.NUMBER,
            description: "width"
        },

        height: {
            kind: PropertyKind.SCALAR,
            type: ValueType.NUMBER,
            description: "height"
        },

        elementSourceIsList: ELEMENT_SOURCE_IS_LIST,
        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: [
        // ElementTypes.SVG_GROUP,
        // ElementTypes.SVG_LINE,
        // ElementTypes.SVG_PATH,
        ElementTypes.SVG_TEXT,
        ElementTypes.CONTROL_COMPONENT
    ]
};
