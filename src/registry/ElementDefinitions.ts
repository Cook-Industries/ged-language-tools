import { ElementTypes } from "./ElementTypes";

export const SYSTEM_FIELDS = new Set([
    "type",
    "children",
    "parameters",
]);

export enum ValueType {
    STRING = "string",
    NUMBER = "number",
    BOOLEAN = "boolean",
}

export enum PropertyState {
    REQUIRED = "required",
    OPTIONAL = "optional",
    DISABLED = "disabled",
}

export interface ParameterDefinition {
    type: ValueType;

    description: string;

    required?: boolean;

    enumValues?: Array<string | number | boolean>;

    isArray?: boolean;

    conflictsWith?: ParameterDefinition[]
}

export interface PropertyDefinition {
    type: ValueType;

    description: string;

    state: PropertyState;
}

export interface ElementDefinition {
    type: string;

    description: string;

    allowedChildren: ElementTypes[];

    parameters: Record<string, ParameterDefinition>;

    properties: Record<string, PropertyDefinition>;
}