import { PropertyDefinition, PropertyState, ValueType } from "./ElementDefinitions";


export const UID_PROPERTY: PropertyDefinition = {
    type: ValueType.STRING,
    description: "Unique identifier for this element",
    state: PropertyState.OPTIONAL,
};

export const CLASSES_PROPERTY: PropertyDefinition = {
    type: ValueType.STRING,
    description: "CSS classes applied to this element",
    state: PropertyState.OPTIONAL,
};

export const ATTRIBUTES_PROPERTY: PropertyDefinition = {
    type: ValueType.STRING,
    description: "HTML attributes applied to this element",
    state: PropertyState.OPTIONAL,
};

export const CHILDREN_PROPERTY: PropertyDefinition = {
    type: ValueType.STRING,
    description: "Child elements",
    state: PropertyState.OPTIONAL,
};

export const DISABLED_UID_PROPERTY: PropertyDefinition = {
    type: ValueType.STRING,
    description: "Unique identifier for this element",
    state: PropertyState.DISABLED,
};

export const DISABLED_CLASSES_PROPERTY: PropertyDefinition = {
    type: ValueType.STRING,
    description: "CSS classes applied to this element",
    state: PropertyState.DISABLED,
};

export const DISABLED_CHILDREN_PROPERTY: PropertyDefinition = {
    type: ValueType.STRING,
    description: "Children are not supported by this element",
    state: PropertyState.DISABLED,
};