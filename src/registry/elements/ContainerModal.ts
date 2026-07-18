import { ELEMENT_SOURCE } from "../CommonParameters";
import { ATTRIBUTES_PROPERTY, CLASSES_PROPERTY, UID_PROPERTY } from "../CommonProperties";
import { ElementDefinition, ValueType } from "../ElementDefinitions";
import { ElementTypes } from "../ElementTypes";

export const MODAL: ElementDefinition = {
    type: "modal",

    description: "Modal container",

    properties: {
        uid: UID_PROPERTY,
        classes: CLASSES_PROPERTY,
        attributes: ATTRIBUTES_PROPERTY
    },

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
        ElementTypes.CONTAINER_FORM,
        ElementTypes.CONTAINER_IMAGE,
        ElementTypes.CONTAINER_LINK,
        ElementTypes.CONTAINER_TEXT,
        ElementTypes.CONTAINER_HEADING,
        ElementTypes.CONTAINER_TABLE,
        ElementTypes.CONTROL_COMPONENT
    ]
};
