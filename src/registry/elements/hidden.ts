import { ElementDefinition } from "../types";
import { ElementType } from "../elementTypes";

export const HIDDEN: ElementDefinition = {
    type: "hidden",

    description: "Generic content container but hidden",

    parameters: {},

    allowedChildren: [
        ElementType.AUDIO,
        ElementType.BUTTON,
        ElementType.BURGER,
        ElementType.BUTTON_BAR,
        ElementType.BUTTON_ICON,
        ElementType.CONTENT,
        ElementType.FORM,
        ElementType.HIDDEN,
        ElementType.IMAGE,
        ElementType.LINK,
        ElementType.SPLITTED,
        ElementType.SVG,
        ElementType.TAB,
        ElementType.TABLE,
        ElementType.TEXT,
        ElementType.HEADING,
        ElementType.EMPTY
    ],
};
