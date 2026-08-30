import { ElementDefinition, PropertyKind, ValueType } from "../ElementDefinitions";

export const COMPONENT: ElementDefinition = {
    type: "component",

    description: "linkable source component",

    properties: {
    },

    parameters: {
        path: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "resource path",
            required: true
        },

        src: {
            kind: PropertyKind.SCALAR,
            type: ValueType.STRING,
            description: "variable name for FlatMappable/FlatMappableList"
        },

        isSourceList: {
            kind: PropertyKind.SCALAR,
            type: ValueType.BOOLEAN,
            description: "is src a FlatMappableList"
        },
    },

    allowedChildren: []
};
