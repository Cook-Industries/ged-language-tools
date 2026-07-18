import { ParameterDefinition, ValueType } from "./ElementDefinitions";

export const uidParam: ParameterDefinition = {
    type: ValueType.STRING,
    description: "the uid for this element"
};

export const TOOLTIP: ParameterDefinition = {
    type: ValueType.STRING,
    description: "Tooltip text",
};

export const REPETITION_SOURCE: ParameterDefinition = {
    type: ValueType.STRING,
    description: "The name of a source list of FlatMappableList for repetition of this element",
};

export const ELEMENT_SOURCE: ParameterDefinition = {
    type: ValueType.STRING,
    description: "The name of a source of FlatMappable to fill this element",
};

// Conflicts
REPETITION_SOURCE.conflictsWith = [ELEMENT_SOURCE];
ELEMENT_SOURCE.conflictsWith = [REPETITION_SOURCE];