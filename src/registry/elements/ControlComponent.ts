import { DISABLED_CHILDREN_PROPERTY } from "../CommonProperties";
import { ElementDefinition, ValueType } from "../ElementDefinitions";

export const COMPONENT: ElementDefinition = {
    type: "component",

    description: "linkable source component",

    properties: {
        DISABLED_CHILDREN_PROPERTY
    },

    parameters: {
        path: {
            type: ValueType.STRING,
            description: "resource path",
            required: true
        },

        src: {
            type: ValueType.STRING,
            description: "TokenMap var name for FlatMappable/FlatMappableList",
            required: true
        },

        isSourceList: {
            type: ValueType.BOOLEAN,
            description: "is source a FlatMappableList"
        },
    },

    allowedChildren: []
};
