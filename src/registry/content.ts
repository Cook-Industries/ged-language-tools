import { ElementDefinition } from "./types";

export const CONTENT: ElementDefinition = {
    type: "content",

    description: "Generic content container",

    parameters: {},

    allowedChildren: [
        "AUDIO",
        "BUTTON",
        "BURGER",
        "BUTTON_BAR",
        "BUTTON_ICON",
        "CONTENT",
        "FORM",
        "HIDDEN",
        "IMAGE",
        "LINK",
        "SPLITTED",
        "SVG",
        "TAB",
        "TABLE",
        "TEXT",
        "HEADING",
        "EMPTY",
    ],
};
