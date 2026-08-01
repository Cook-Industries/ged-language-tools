# Versioning reference

How to gate each construct to a specific range of `.ged` library versions.

Every construct below accepts the same two optional fields:

- `since` — first version this is valid in (**inclusive**). Omit if always valid.
- `until` — last version this is still valid in (**inclusive**). Omit if still valid in the current version.

Leaving both off means "valid in every version" — this is the default, and is what all existing definitions do today without any changes.

The currently configured version comes from the `gedLanguageTools.libraryVersion` setting (e.g. `"3.5"`, `"4.0"`).

---

## 1. Whole element type

Gate an entire `ElementDefinition` — the type won't resolve at all outside its range, and any element referencing it as an allowed child will silently exclude it too.

```ts
// src/elements/ContainerContent.ts
export const CONTENT: ElementDefinition = {
    type: "content",
    since: "4.0",           // doesn't exist before 4.0
    // until: "4.5",        // uncomment if it gets removed later

    description: "Generic content container",

    properties: { ... },
    parameters: { ... },
    allowedChildren: [ ... ],
};
```

**Effect when out of range:** the root-type lookup and every parent's `allowedChildren` resolution treat it as if it didn't exist. Using it produces `Root type "content" not found in TypeRegistry.` or `Type "content" is not allowed here.`

---

## 2. A single property

Gate one entry inside `properties` without touching the rest of the element.

```ts
// src/elements/ContainerContent.ts
properties: {
    uid: UID_PROPERTY,
    classes: CLASSES_PROPERTY,
    attributes: ATTRIBUTES_PROPERTY,
    layout: { ...LAYOUT_PROPERTY, since: "4.0" },   // new in 4.0, only for this element
},
```

If the property should be gated **everywhere it's used**, put `since`/`until` on the shared constant itself instead:

```ts
// src/CommonProperties.ts
export const LAYOUT_PROPERTY: PropertyDefinition = {
    kind: PropertyKind.SCALAR,
    type: ValueType.STRING,
    description: "layout mode",
    state: PropertyState.OPTIONAL,
    since: "4.0",   // gated for every element that references it
};
```

**Effect when out of range:** treated as unknown for validation purposes, with a specific message: `Property "layout" is not available for type "content" in version 3.5 (available from version 4.0).` A `REQUIRED` property that's out of range is not enforced as missing.

---

## 3. A single parameter

Same pattern as properties, but inside `parameters`.

```ts
// src/elements/ContainerContent.ts
parameters: {
    repetitionSource: REPETITION_SOURCE,
    elementSource: { ...ELEMENT_SOURCE, since: "4.0" },   // override, this element only
},
```

Or gate the shared constant everywhere it's used:

```ts
// src/CommonParameters.ts
export const ELEMENT_SOURCE: ParameterDefinition = {
    kind: PropertyKind.SCALAR,
    type: ValueType.STRING,
    description: "name of a source of FlatMappable to fill this element",
    since: "4.0",
};
```

**Effect when out of range:** `Parameter "elementSource" is not available for type "content" in version 3.5 (available from version 4.0).` `required: true` on an out-of-range parameter is not enforced.

---

## 4. A single allowed child

Gate one entry inside `allowedChildren` without affecting the child type everywhere else it's allowed.

```ts
// src/elements/ContainerContent.ts
allowedChildren: [
    ElementTypes.CONTAINER_AUDIO,                                  // always allowed
    { type: ElementTypes.CONTAINER_SVG, since: "4.0" },             // only allowed here from 4.0
    ElementTypes.CONTAINER_BUTTON,
],
```

Note: this is independent from gating the child's own `ElementDefinition` (see §1). If `CONTAINER_SVG` itself has `since: "4.0"`, it's already excluded everywhere below that version — you'd only add a range here if the *relationship* (this parent allowing this child) has its own, different version boundary.

**Effect when out of range:** the child type is silently absent from `allowedChildren` resolution for that version — `Type "svg" is not allowed here. Allowed types: [...]`, with `svg` missing from the list.

---

## 5. A single enum value

Gate one allowed value inside a parameter's `enumValues`, leaving the other values and the parameter itself untouched.

```ts
// src/CommonParameters.ts
export const LAYOUT_MODE: ParameterDefinition = {
    kind: PropertyKind.SCALAR,
    type: ValueType.STRING,
    description: "layout mode",
    enumValues: [
        "static",
        "dynamic",
        { value: "lazy", since: "4.0" },   // new option in 4.0
    ],
};
```

**Effect when out of range:** the value is dropped from the allowed list for that version — `Invalid value "lazy" for "layoutMode". Allowed values: [static, dynamic]` (no `lazy`) when the configured version is below 4.0.

---

## Quick reference

| What | Where the range goes |
| --- | --- |
| Whole element type | Top level of the `ElementDefinition` object |
| One property, this element only | `{ ...BASE_PROPERTY, since / until }` inline in `properties` |
| One property, everywhere it's used | `since` / `until` on the shared constant in `CommonProperties.ts` |
| One parameter, this element only | `{ ...BASE_PARAM, since / until }` inline in `parameters` |
| One parameter, everywhere it's used | `since` / `until` on the shared constant in `CommonParameters.ts` |
| One allowed child, this element only | `{ type: ElementTypes.X, since / until }` inline in `allowedChildren` |
| One enum value | `{ value: "x", since / until }` inline in `enumValues` |

## Tips

- Default to doing nothing. Only add a range when you've confirmed an actual difference between versions — most definitions never need to change.
- Prefer gating the shared constant (`CommonProperties.ts` / `CommonParameters.ts`) over an inline override when the change applies to every element that uses it — one edit instead of N.
- Use the inline `{ ...BASE, since/until }` override only when the *same* shared property/parameter has *different* version boundaries depending on which element it's attached to.
- `since`/`until` are both inclusive — `until: "3.9"` means "valid through 3.9", not "valid until, but not including, 3.9".
