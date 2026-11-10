import { ParameterDefinition, PropertyKind, ValueType } from "../ElementDefinitions";

export const MENU_ENTRY_TEXT: ParameterDefinition = {
    kind: PropertyKind.SCALAR,
    type: ValueType.STRING,
    description: "text, the accessible name and with iconOnly the tooltip",
    required: true
};

export const MENU_ENTRY_ICON: ParameterDefinition = {
    kind: PropertyKind.SCALAR,
    type: ValueType.STRING,
    description: "Bootstrap icon class, e.g. bi-house"
};

export const MENU_ENTRY_ICON_ONLY: ParameterDefinition = {
    kind: PropertyKind.SCALAR,
    type: ValueType.BOOLEAN,
    description: "shows only the icon, needs icon (default: false)"
};

export const MENU_ENTRY_END: ParameterDefinition = {
    kind: PropertyKind.SCALAR,
    type: ValueType.BOOLEAN,
    description: "the entry and the entries after it sit at the end of the bar, not allowed in a menu (default: false)"
};
