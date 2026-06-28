import { ElementDefinition, ValueType } from "../types";

export const BUTTON_ICON: ElementDefinition = {
    type: "button_icon",

    description: "Button",

    parameters: {
        image: {
            type: ValueType.STRING,
            description: "image url",
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
        },

        tooltip: {
            type: ValueType.STRING,
            description: "onhover tooltip"
        },

        title: {
            type: ValueType.STRING,
            description: "image alt text"
        }
    },

    allowedChildren: []
};
