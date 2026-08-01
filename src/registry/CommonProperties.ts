import { PropertyDefinition, PropertyKind, PropertyState, ValueType } from "./ElementDefinitions";


export const UID_PROPERTY: PropertyDefinition = {
    kind: PropertyKind.SCALAR,
    type: ValueType.STRING,
    description: "Unique identifier for this element",
    state: PropertyState.OPTIONAL
};

export const CLASSES_PROPERTY: PropertyDefinition = {
    kind: PropertyKind.LIST,
    type: ValueType.STRING,
    description: "CSS classes applied to this element",
    state: PropertyState.OPTIONAL
};

export const ATTRIBUTES_PROPERTY: PropertyDefinition = {
    kind: PropertyKind.MAP,
    type: ValueType.STRING,
    description: "HTML attributes applied to this element",
    state: PropertyState.OPTIONAL
};