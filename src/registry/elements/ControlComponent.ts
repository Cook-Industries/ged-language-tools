import { ElementDefinition, ValueType } from "../ElementDefinitions";

export const COMPONENT: ElementDefinition = {
    type: "component",

    description: "linkable source component",

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
