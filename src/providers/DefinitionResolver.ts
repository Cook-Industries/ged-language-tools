import {
    AllowedChild,
    ElementDefinition,
    EnumValue,
    isVersionedEnumValue,
    ParameterDefinition,
    PropertyDefinition,
} from "../registry/ElementDefinitions";
import { TypeRegistry } from "../registry/ElementTypes";
import { isVersionSupported, VersionString } from "../Version";

/**
 * Find a type definition by its `type` string, skipping any definition
 * that isn't valid for the given version.
 */
export function findDefinition(
    type: string,
    version: VersionString
): ElementDefinition | undefined {

    for (const key in TypeRegistry) {

        const definition =
            TypeRegistry[key];

        if (
            definition.type.toLowerCase() === type.toLowerCase() &&
            isVersionSupported(version, definition)
        ) {
            return definition;
        }
    }

    return undefined;
}

/**
 * Every root-level type definition valid for the given version.
 * There's no "allowedChildren" restriction at the document root, so this
 * is just every registered definition, version-filtered.
 */
export function allRootDefinitions(
    version: VersionString
): ElementDefinition[] {

    return Object
        .values(TypeRegistry)
        .filter((definition) => isVersionSupported(version, definition));
}

/**
 * Normalizes an allowedChildren entry, which may be a bare ElementTypes
 * value (always allowed) or a { type, since, until } object.
 */
function normalizeAllowedChild(
    entry: AllowedChild
): { type: string; since?: VersionString; until?: VersionString } {

    if (typeof entry === "string") {
        return { type: entry };
    }

    const { type, since, until } = entry;

    return { type, since, until };
}

/**
 * Resolve enum IDs from allowedChildren into actual ElementDefinitions,
 * filtering out entries that aren't valid for the given version — either
 * because the allowedChildren entry itself is version-gated, or because
 * the referenced element type is.
 */
export function resolveAllowedChildren(
    definition: ElementDefinition,
    version: VersionString
): ElementDefinition[] {

    const result: ElementDefinition[] = [];

    for (const entry of definition.allowedChildren) {

        const { type: enumId, ...range } = normalizeAllowedChild(entry);

        if (!isVersionSupported(version, range)) {
            continue;
        }

        const childDefinition = TypeRegistry[enumId];

        if (childDefinition && isVersionSupported(version, childDefinition)) {
            result.push(childDefinition);
        }
    }

    return result;
}

/**
 * All properties on a definition that are valid for the given version.
 */
export function resolveSupportedProperties(
    definition: ElementDefinition,
    version: VersionString
): Array<[string, PropertyDefinition]> {

    return Object
        .entries(definition.properties)
        .filter(([, propertyDefinition]) => isVersionSupported(version, propertyDefinition));
}

/**
 * All parameters on a definition that are valid for the given version.
 */
export function resolveSupportedParameters(
    definition: ElementDefinition,
    version: VersionString
): Array<[string, ParameterDefinition]> {

    return Object
        .entries(definition.parameters)
        .filter(([, parameterDefinition]) => isVersionSupported(version, parameterDefinition));
}

/**
 * Resolves a parameter's enumValues down to the raw values that are valid
 * for the given version (unwrapping any { value, since, until } entries).
 * Returns an empty array if the parameter has no enumValues at all.
 */
export function resolveSupportedEnumValues(
    definition: ParameterDefinition,
    version: VersionString
): EnumValue[] {

    if (!definition.enumValues) {
        return [];
    }

    return definition
        .enumValues
        .filter((entry) => (isVersionedEnumValue(entry) ? isVersionSupported(version, entry) : true))
        .map((entry) => (isVersionedEnumValue(entry) ? entry.value : entry));
}
