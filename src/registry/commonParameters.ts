import { ParameterDefinition, PropertyKind, ValueType } from "./ElementDefinitions";

export const uidParam: ParameterDefinition = {
    kind: PropertyKind.SCALAR,
    type: ValueType.STRING,
    description: "uid for this element"
};

export const TOOLTIP: ParameterDefinition = {
    kind: PropertyKind.SCALAR,
    type: ValueType.STRING,
    description: "tooltip text",
};

export const ELEMENT_SOURCE_IS_LIST: ParameterDefinition = {
    kind: PropertyKind.SCALAR,
    type: ValueType.BOOLEAN,
    description: "true if elementSource references a FlatMappableList for repetition",
};

export const ELEMENT_SOURCE: ParameterDefinition = {
    kind: PropertyKind.SCALAR,
    type: ValueType.STRING,
    description: "name of a source of FlatMappable to fill this element",
};

export const INPUT_NAME: ParameterDefinition = {
    kind: PropertyKind.SCALAR,
    type: ValueType.STRING,
    description: "display name of this field",
    required: true
};

export const INPUT_SUBMIT_AS: ParameterDefinition = {
    kind: PropertyKind.SCALAR,
    type: ValueType.STRING,
    description: "submit name of this value on transfer",
    required: true
};

export const INPUT_DISABLED: ParameterDefinition = {
    kind: PropertyKind.SCALAR,
    type: ValueType.BOOLEAN,
    description: "whether this input is active"
};

export const INPUT_ONINPUT: ParameterDefinition = {
    kind: PropertyKind.SCALAR,
    type: ValueType.STRING,
    description: "function call to trigger on any input (except enter) press"
};

export const INPUT_INFO_TEXT: ParameterDefinition = {
    kind: PropertyKind.SCALAR,
    type: ValueType.STRING,
    description: "text shown in info icon hover"
};

export const INPUT_INFO_URL: ParameterDefinition = {
    kind: PropertyKind.SCALAR,
    type: ValueType.STRING,
    description: "url to call to if info icon is clicked"
};

export const INPUT_PLACEHOLDER: ParameterDefinition = {
    kind: PropertyKind.SCALAR,
    type: ValueType.STRING,
    description: "placeholder for value"
};

export const INPUT_ON_ENTER_PRESS: ParameterDefinition = {
    kind: PropertyKind.SCALAR,
    type: ValueType.STRING,
    description: "function call to trigger on enter press"
};

export const INPUT_MANDATORY: ParameterDefinition = {
    kind: PropertyKind.SCALAR,
    type: ValueType.BOOLEAN,
    description: "whether this input is mandatory"
};

export const BTN_CLASS: ParameterDefinition = {
    kind: PropertyKind.SCALAR,
    type: ValueType.STRING,
    description: "color type of this button",
    enumValues: [
        "default",
        "primary",
        "secondary",
        "success",
        "warning",
        "error",
        "danger",
        "info",
        "light",
        "dark",
        "link",
        "custom"
    ]
};

// Conflicts
//ELEMENT_SOURCE_IS_LIST.conflictsWith = [ELEMENT_SOURCE];
//ELEMENT_SOURCE.conflictsWith = [ELEMENT_SOURCE_IS_LIST];