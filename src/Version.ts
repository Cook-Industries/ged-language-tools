/**
 * A dot-separated version string, e.g. "3.5", "4.0", "3.5.2".
 * Segments are compared numerically, left to right.
 */
export type VersionString = string;

/**
 * Optional version constraints shared by elements, properties,
 * parameters, allowed-children entries, and individual enum values.
 *
 * - `since`: the version this entry was introduced in (inclusive).
 *   Omit if it has always existed.
 * - `until`: the last version this entry is still valid in (inclusive).
 *   Omit if it's still valid in the current/latest version.
 *
 * An entry with neither field set is considered valid in every version.
 */
export interface VersionRange {
    since?: VersionString;
    until?: VersionString;
}

/**
 * Parses "3.5.2" into [3, 5, 2]. Missing/non-numeric segments become 0.
 */
function parseVersion(version: VersionString): number[] {

    return version
        .split(".")
        .map((segment) => {
            const parsed = parseInt(segment, 10);
            return Number.isNaN(parsed) ? 0 : parsed;
        });
}

/**
 * Compares two version strings segment by segment.
 * Returns <0 if a<b, 0 if equal, >0 if a>b.
 * Shorter versions are treated as zero-padded ("4" == "4.0").
 */
export function compareVersions(a: VersionString, b: VersionString): number {

    const partsA = parseVersion(a);
    const partsB = parseVersion(b);
    const length = Math.max(partsA.length, partsB.length);

    for (let i = 0; i < length; i++) {

        const segmentA = partsA[i] ?? 0;
        const segmentB = partsB[i] ?? 0;

        if (segmentA !== segmentB) {
            return segmentA - segmentB;
        }
    }

    return 0;
}

/**
 * Checks whether `current` satisfies a `since`/`until` range.
 * Both bounds are inclusive. An entry with no range at all is
 * considered supported in every version.
 */
export function isVersionSupported(
    current: VersionString,
    range: VersionRange,
): boolean {

    if (range.since && compareVersions(current, range.since) < 0) {
        return false;
    }

    if (range.until && compareVersions(current, range.until) > 0) {
        return false;
    }

    return true;
}

/**
 * Builds a short human-readable explanation for why something is out of
 * range, for use in diagnostic messages. Only call this when
 * isVersionSupported() has already returned false for the same range.
 */
export function describeVersionConstraint(range: VersionRange): string {

    const parts: string[] = [];

    if (range.since) {
        parts.push(`available from version ${range.since}`);
    }

    if (range.until) {
        parts.push(`removed after version ${range.until}`);
    }

    return parts.join(", ");
}
