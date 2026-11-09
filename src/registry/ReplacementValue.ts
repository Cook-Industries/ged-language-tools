const REPLACEMENT_IDENTIFIERS = ["value", "text", "function", "class"] as const;
type ReplacementIdentifier = typeof REPLACEMENT_IDENTIFIERS[number];

const REPLACEMENT_PATTERN =
    /^\$\$(?<identifier>[A-Za-z]+)\$(?<name>[A-Za-z_][A-Za-z0-9_\-]*)(?:\|(?<values>[A-Za-z_][A-Za-z0-9_\-]*))?$/;

export interface ParsedReplacement {
    identifier: string;
    name: string;
    values?: string;
    isValidIdentifier: boolean;
}

/**
 * Returns null if the string isn't shaped like a replacement value at all.
 * Returns a ParsedReplacement (with isValidIdentifier possibly false) if it
 * *looks* like one but uses an unknown identifier keyword.
 */
export function parseReplacementValue(raw: string): ParsedReplacement | null {
    const match = REPLACEMENT_PATTERN.exec(raw);

    if (!match || !match.groups) {
        return null;
    }

    const { identifier, name, values } = match.groups;

    return {
        identifier,
        name,
        values,
        isValidIdentifier: (REPLACEMENT_IDENTIFIERS as readonly string[]).includes(identifier),
    };
}