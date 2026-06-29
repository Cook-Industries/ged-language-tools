import { ElementDefinition, ValueType } from "../types";
import { ElementType } from "../elementTypes";
import { ELEMENT_SOURCE } from "../commonParameters";

export const MODAL: ElementDefinition = {
    type: "modal",

    description: "Modal container",

    parameters: {
        name: {
            type: ValueType.STRING,
            description: "top level heading name of this modal",
            required: true
        },


        requestUrl: {
            type: ValueType.STRING,
            description: "url for transmission"
        },

        closeOnOverlayClick: {
            type: ValueType.STRING,
            description: "if modal should be closed if clicked outside of it"
        },

        btnLeftName: {
            type: ValueType.STRING,
            description: "name of the left button"
        },

        btnLeftClass: {
            type: ValueType.STRING,
            description: "name of the left button",
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

        btnLeftFunction: {
            type: ValueType.STRING,
            description: "function on the left button"
        },

        btnCenterName: {
            type: ValueType.STRING,
            description: "name of the center button"
        },

        btnCenterClass: {
            type: ValueType.STRING,
            description: "name of the center button",
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

        btnCenterFunction: {
            type: ValueType.STRING,
            description: "function on the center button"
        },



        btnRightName: {
            type: ValueType.STRING,
            description: "name of the right button"
        },

        btnRightClass: {
            type: ValueType.STRING,
            description: "name of the right button",
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

        btnRightFunction: {
            type: ValueType.STRING,
            description: "function on the right button"
        },

        elementSource: ELEMENT_SOURCE
    },

    allowedChildren: [
        ElementType.FORM,
        ElementType.IMAGE,
        ElementType.LINK,
        ElementType.TEXT,
        ElementType.HEADING,
        ElementType.TABLE
    ]
};
