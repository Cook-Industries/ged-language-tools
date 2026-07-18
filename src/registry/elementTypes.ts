import { CONTENT } from "./elements/ContainerContent";
import { ElementDefinition } from "./ElementDefinitions";
import { AUDIO } from "./elements/ContainerAudio";
import { BURGER } from "./elements/ContainerBurger";
import { BURGER_ITEM } from "./elements/SubtypeBurgerItem";
import { BUTTON_ICON } from "./elements/ContainerButtonIcon";
import { FORM } from "./elements/ContainerForm";
import { HEADING } from "./elements/ContainerHeading";
import { TEXT } from "./elements/ContainerText";
import { COMPONENT } from "./elements/ControlComponent";
import { HIDDEN } from "./elements/ContainerHidden";
import { IMAGE } from "./elements/ContainerImage";
import { LINK } from "./elements/ContainerLink";
import { MODAL } from "./elements/ContainerModal";
import { SPLITTED } from "./elements/ContainerSplitted";
import { SVG } from "./elements/ContainerSVG";
import { TABBED } from "./elements/ContainerTabbed";
import { SVG_TEXT } from "./elements/SVGText";
import { TABLE } from "./elements/ContainerTable";
import { TABLE_ROW } from "./elements/SubtypeTableRow";
import { BUTTON } from "./elements/ContainerButton";

export enum ElementTypes {
    CONTAINER_AUDIO = "container-audio",
    CONTAINER_BURGER = "container-burger",
    SUBTYPE_BURGER_ITEM = "subtype-burger-item",
    CONTAINER_BUTTON_ICON = "container-button-icon",
    CONTAINER_FORM = "container-form",
    CONTAINER_HEADING = "container-heading",
    CONTAINER_CONTENT = 'container-content',
    CONTAINER_TEXT = 'container-text',
    CONTROL_COMPONENT = 'control-component',
    CONTAINER_HIDDEN = "container-hidden",
    CONTAINER_IMAGE = "container-image",
    CONTAINER_LINK = "container-link",
    CONTAINER_MODAL = "container-modal",
    CONTAINER_SPLITTED = "container-splitted",
    CONTAINER_SVG = "container-svg",
    CONTAINER_TABBED = "container-tabbed",
    SVG_TEXT = "svg-text",
    CONTAINER_TABLE = "container-table",
    SUBTYPE_TABLE_ROW = "subtype-table-row",
    CONTAINER_BUTTON = "container-button"
}

export const TypeRegistry: Record<string, ElementDefinition> = {
    [ElementTypes.CONTAINER_AUDIO]: AUDIO,

    [ElementTypes.CONTAINER_BURGER]: BURGER,

    [ElementTypes.SUBTYPE_BURGER_ITEM]: BURGER_ITEM,

    [ElementTypes.CONTAINER_BUTTON_ICON]: BUTTON_ICON,

    [ElementTypes.CONTAINER_FORM]: FORM,

    [ElementTypes.CONTAINER_HEADING]: HEADING,

    [ElementTypes.CONTAINER_CONTENT]: CONTENT,

    [ElementTypes.CONTAINER_TEXT]: TEXT,

    [ElementTypes.CONTROL_COMPONENT]: COMPONENT,

    [ElementTypes.CONTAINER_HIDDEN]: HIDDEN,

    [ElementTypes.CONTAINER_IMAGE]: IMAGE,

    [ElementTypes.CONTAINER_LINK]: LINK,

    [ElementTypes.CONTAINER_MODAL]: MODAL,

    [ElementTypes.CONTAINER_SPLITTED]: SPLITTED,

    [ElementTypes.CONTAINER_SVG]: SVG,

    [ElementTypes.CONTAINER_TABBED]: TABBED,

    [ElementTypes.SVG_TEXT]: SVG_TEXT,

    [ElementTypes.CONTAINER_TABLE]: TABLE,

    [ElementTypes.SUBTYPE_TABLE_ROW]: TABLE_ROW,

    [ElementTypes.CONTAINER_BUTTON]: BUTTON,
};