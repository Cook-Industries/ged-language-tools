import { ElementDefinition, ValueType } from "./types";

export const BUTTON: ElementDefinition = {
    type: "button",

    description: "Button",

    parameters: {
        text: {
            type: ValueType.STRING,
            description: "Button text",
        },

        btnClass: {
            type: ValueType.STRING,
            description: "Button text",
            enumValues: [
                "default",
                "primary",
                "secondary",
                "sucess",
                "warning",
                "error",
                "danger",
                "info",
                "light",
                "dark",
                "link",
                "custom",
            ],
        },

        disabled: {
            type: ValueType.BOOLEAN,
            description: "Disabled state",
        },
    },

    allowedChildren: [],
};
