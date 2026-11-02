import { ElementTypes } from "./ElementTypes";
import { VersionRange } from "../Version";

export const SYSTEM_FIELDS = new Set([
    "type",
    "children",
    "parameters",
]);

export enum ValueType {
    STRING = "string",
    NUMBER = "number",
    NUMBER_OR_STRING = "number or string",
    BOOLEAN = "boolean",
    FUNCTION = "function",
}

export enum PropertyState {
    REQUIRED = "required",
    OPTIONAL = "optional",
    DISABLED = "disabled",
}

export enum PropertyKind {
    SCALAR = "scalar",
    LIST = "list",
    MAP = "map",
}

//
// Enum values (used by ParameterDefinition.enumValues)
//

export type EnumValue = string | number | boolean;

export type VersionedEnumValue = VersionRange & { value: EnumValue };

export function isVersionedEnumValue(
    entry: EnumValue | VersionedEnumValue,
): entry is VersionedEnumValue {

    return (
        typeof entry === "object" &&
        entry !== null &&
        "value" in entry
    );
}

//
// ParameterDefinition
//

interface ParameterDefinitionBase extends VersionRange {
    description: string;

    /**
    * true/false = always (not) required, regardless of parent.
    * ElementTypes[] = required, EXCEPT when the parent element's type
    * is one of the listed types (in which case it becomes optional).
    */
    required?: boolean | ElementTypes[];

    enumValues?: Array<EnumValue | VersionedEnumValue>;

    conflictsWith?: ParameterDefinition[];
}

export interface ScalarParameterDefinition extends ParameterDefinitionBase {
    kind: PropertyKind.SCALAR;
    type: ValueType;
}

export interface ListParameterDefinition extends ParameterDefinitionBase {
    kind: PropertyKind.LIST;
    type: ValueType; // type of each element
}

export interface MapParameterDefinition extends ParameterDefinitionBase {
    kind: PropertyKind.MAP;
    type: ValueType; // type of each value
}

export type ParameterDefinition =
    | ScalarParameterDefinition
    | ListParameterDefinition
    | MapParameterDefinition;

//
// PropertyDefinition
//

interface PropertyDefinitionBase extends VersionRange {
    description: string;

    state: PropertyState;
}

export interface ScalarPropertyDefinition extends PropertyDefinitionBase {
    kind: PropertyKind.SCALAR;
    type: ValueType;
}

export interface ListPropertyDefinition extends PropertyDefinitionBase {
    kind: PropertyKind.LIST;
    type: ValueType;
}

export interface MapPropertyDefinition extends PropertyDefinitionBase {
    kind: PropertyKind.MAP;
    type: ValueType;
}

export type PropertyDefinition =
    | ScalarPropertyDefinition
    | ListPropertyDefinition
    | MapPropertyDefinition;

//
// Allowed children
//

export type AllowedChild = ElementTypes | (VersionRange & { type: ElementTypes });

//
// ElementDefinition
//

export interface ElementDefinition extends VersionRange {
    type: string;

    description: string;

    allowedChildren: AllowedChild[];

    parameters: Record<string, ParameterDefinition>;

    properties: Record<string, PropertyDefinition>;
}

/**
 * Resolves a ParameterDefinition's `required` field against the actual
 * parent element type. A plain boolean is returned as-is. An array is
 * treated as an inclusion list: required only when parentType is in it.
 */
export function resolveRequired(
    parameter: ParameterDefinition,
    parentType?: string,
): boolean {

    const { required } = parameter;

    if (required === undefined) {
        return false;
    }

    if (typeof required === "boolean") {
        return required;
    }

    // required is ElementTypes[] — an inclusion list
    if (!parentType) {
        return false;
    }

    return required.some(
        (requiredUnderType) => requiredUnderType.toLowerCase() === parentType.toLowerCase()
    );
}
