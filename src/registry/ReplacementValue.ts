const REPLACEMENT_IDENTIFIERS = ["value", "text", "function"] as const;
type ReplacementIdentifier = typeof REPLACEMENT_IDENTIFIERS[number];

const REPLACEMENT_PATTERN = /^\$\$(?<identifier>[A-Za-z]+)\$(?<name>[A-Za-z_][A-Za-z0-9_]*)$/;

export interface ParsedReplacement {
    identifier: string;
    name: string;
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

    const { identifier, name } = match.groups;

    return {
        identifier,
        name,
        isValidIdentifier: (REPLACEMENT_IDENTIFIERS as readonly string[]).includes(identifier),
    };
}