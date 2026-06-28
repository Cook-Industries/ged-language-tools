import { ElementDefinition, ValueType } from "../types";

export const BUTTON: ElementDefinition = {
    type: "button",

    description: "Button",

    parameters: {
        text: {
            type: ValueType.STRING,
            description: "Button text",
            required: true
        },

        onClick: {
            type: ValueType.STRING,
            description: "onClick function",
            required: true
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
                "custom"
            ]
        }
    },

    allowedChildren: []
};
