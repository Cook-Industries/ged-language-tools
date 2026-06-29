export enum ValueType {
    STRING = "string",
    NUMBER = "number",
    BOOLEAN = "boolean",
}
export interface ParameterDefinition {
    type: ValueType;

    description: string;

    required?: boolean;

    enumValues?: Array<string | number | boolean>;

    isArray?: boolean;

    conflictsWith?: ParameterDefinition[]
}

export interface ElementDefinition {
    type: string;

    description: string;

    allowedChildren: string[];

    parameters: Record<string, ParameterDefinition>;
}