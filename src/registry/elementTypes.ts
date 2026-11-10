import { AUDIO } from "./elements/ContainerAudio";
import { BURGER } from "./elements/ContainerBurger";
import { BURGER_ITEM } from "./elements/SubtypeBurgerItem";
import { BUTTON } from "./elements/ContainerButton";
import { BUTTON_ICON } from "./elements/ContainerButtonIcon";
import { COMPONENT } from "./elements/ControlComponent";
import { CONTENT } from "./elements/ContainerContent";
import { ElementDefinition } from "./ElementDefinitions";
import { FORM } from "./elements/ContainerForm";
import { HEADING } from "./elements/ContainerHeading";
import { HIDDEN } from "./elements/ContainerHidden";
import { IMAGE } from "./elements/ContainerImage";
import { INPUT_CHECKBOX } from "./elements/InputCheckbox";
import { INPUT_DATE } from "./elements/InputDate";
import { INPUT_FILE } from "./elements/InputFile";
import { INPUT_GROUP } from "./elements/InputGroup";
import { INPUT_HIDDEN } from "./elements/InputHidden";
import { INPUT_NUMBER } from "./elements/InputNumber";
import { INPUT_PASSWORD } from "./elements/InputPassword";
import { INPUT_RADIO } from "./elements/InputRadio";
import { INPUT_SELECT } from "./elements/InputSelect";
import { INPUT_SLIDER } from "./elements/InputSlider";
import { INPUT_SWITCH } from "./elements/InputSwitch";
import { INPUT_TAG } from "./elements/InputTag";
import { INPUT_TEXTAREA } from "./elements/InputTextarea";
import { INPUT_TEXTBOX } from "./elements/InputTextbox";
import { INPUT_TEXTFIELD } from "./elements/InputTextfield";
import { INPUT_VALUE } from "./elements/SubtypeInputValue";
import { LINK } from "./elements/ContainerLink";
import { MENU } from "./elements/SubtypeMenu";
import { MENU_ITEM } from "./elements/SubtypeMenuItem";
import { MENU_LINK } from "./elements/SubtypeMenuLink";
import { MENU_SEPARATOR } from "./elements/SubtypeMenuSeparator";
import { MENUBAR } from "./elements/ContainerMenubar";
import { MODAL } from "./elements/ContainerModal";
import { SPLITTED } from "./elements/ContainerSplitted";
import { SVG } from "./elements/ContainerSVG";
import { SVG_TEXT } from "./elements/SVGText";
import { TAB } from "./elements/SubtypeTab";
import { TABBED } from "./elements/ContainerTabbed";
import { TABLE } from "./elements/ContainerTable";
import { TABLE_COLUMN } from "./elements/SubtypeTableColumn";
import { TABLE_ROW } from "./elements/SubtypeTableRow";
import { TEXT } from "./elements/ContainerText";

export enum ElementTypes {
    CONTAINER_AUDIO = "container-audio",
    CONTAINER_BURGER = "container-burger",
    CONTAINER_BUTTON = "container-button",
    CONTAINER_BUTTON_ICON = "container-button-icon",
    CONTAINER_CONTENT = 'container-content',
    CONTAINER_FORM = "container-form",
    CONTAINER_HEADING = "container-heading",
    CONTAINER_HIDDEN = "container-hidden",
    CONTAINER_IMAGE = "container-image",
    CONTAINER_LINK = "container-link",
    CONTAINER_MENUBAR = "container-menubar",
    CONTAINER_MODAL = "container-modal",
    CONTAINER_SPLITTED = "container-splitted",
    CONTAINER_SVG = "container-svg",
    CONTAINER_TABBED = "container-tabbed",
    CONTAINER_TABLE = "container-table",
    CONTAINER_TEXT = 'container-text',
    CONTROL_COMPONENT = 'control-component',
    INPUT_CHECKBOX = "input-checkbox",
    INPUT_CURRENCY = "input-currency",
    INPUT_DATE = "input-date",
    INPUT_FILE = "input-file",
    INPUT_GROUP = "input-group",
    INPUT_HIDDEN = "input-hidden",
    INPUT_NUMBER = "input-number",
    INPUT_PASSWORD = "input-password",
    INPUT_RADIO = "input-radio",
    INPUT_SELECT = "input-select",
    INPUT_SLIDER = "input-slider",
    INPUT_SWITCH = "input-switch",
    INPUT_TAG = "input-tag",
    INPUT_TEXTAREA = "input-textarea",
    INPUT_TEXTBOX = "input-textbox",
    INPUT_TEXTFIELD = "input-textfield",
    SUBTYPE_BURGER_ITEM = "subtype-burger-item",
    SUBTYPE_INPUT_VALUE = "subtype-input-value",
    SUBTYPE_MENU = "subtype-menu",
    SUBTYPE_MENU_ITEM = "subtype-menu-item",
    SUBTYPE_MENU_LINK = "subtype-menu-link",
    SUBTYPE_MENU_SEPARATOR = "subtype-menu-separator",
    SUBTYPE_TAB = "subtype-tab",
    SUBTYPE_TABLE_COLUMN = "subtype-table-column",
    SUBTYPE_TABLE_ROW = "subtype-table-row",
    SVG_TEXT = "svg-text"
}

export const TypeRegistry: Record<string, ElementDefinition> = {
    [ElementTypes.CONTAINER_AUDIO]: AUDIO,
    [ElementTypes.CONTAINER_BURGER]: BURGER,
    [ElementTypes.CONTAINER_BUTTON]: BUTTON,
    [ElementTypes.CONTAINER_BUTTON_ICON]: BUTTON_ICON,
    [ElementTypes.CONTAINER_CONTENT]: CONTENT,
    [ElementTypes.CONTAINER_FORM]: FORM,
    [ElementTypes.CONTAINER_HEADING]: HEADING,
    [ElementTypes.CONTAINER_HIDDEN]: HIDDEN,
    [ElementTypes.CONTAINER_IMAGE]: IMAGE,
    [ElementTypes.CONTAINER_LINK]: LINK,
    [ElementTypes.CONTAINER_MENUBAR]: MENUBAR,
    [ElementTypes.CONTAINER_MODAL]: MODAL,
    [ElementTypes.CONTAINER_SPLITTED]: SPLITTED,
    [ElementTypes.CONTAINER_SVG]: SVG,
    [ElementTypes.CONTAINER_TABBED]: TABBED,
    [ElementTypes.CONTAINER_TABLE]: TABLE,
    [ElementTypes.CONTAINER_TEXT]: TEXT,
    [ElementTypes.CONTROL_COMPONENT]: COMPONENT,
    [ElementTypes.INPUT_CHECKBOX]: INPUT_CHECKBOX,
    [ElementTypes.INPUT_DATE]: INPUT_DATE,
    [ElementTypes.INPUT_FILE]: INPUT_FILE,
    [ElementTypes.INPUT_GROUP]: INPUT_GROUP,
    [ElementTypes.INPUT_HIDDEN]: INPUT_HIDDEN,
    [ElementTypes.INPUT_NUMBER]: INPUT_NUMBER,
    [ElementTypes.INPUT_PASSWORD]: INPUT_PASSWORD,
    [ElementTypes.INPUT_RADIO]: INPUT_RADIO,
    [ElementTypes.INPUT_SELECT]: INPUT_SELECT,
    [ElementTypes.INPUT_SLIDER]: INPUT_SLIDER,
    [ElementTypes.INPUT_SWITCH]: INPUT_SWITCH,
    [ElementTypes.INPUT_TAG]: INPUT_TAG,
    [ElementTypes.INPUT_TEXTAREA]: INPUT_TEXTAREA,
    [ElementTypes.INPUT_TEXTBOX]: INPUT_TEXTBOX,
    [ElementTypes.INPUT_TEXTFIELD]: INPUT_TEXTFIELD,
    [ElementTypes.SUBTYPE_BURGER_ITEM]: BURGER_ITEM,
    [ElementTypes.SUBTYPE_INPUT_VALUE]: INPUT_VALUE,
    [ElementTypes.SUBTYPE_MENU]: MENU,
    [ElementTypes.SUBTYPE_MENU_ITEM]: MENU_ITEM,
    [ElementTypes.SUBTYPE_MENU_LINK]: MENU_LINK,
    [ElementTypes.SUBTYPE_MENU_SEPARATOR]: MENU_SEPARATOR,
    [ElementTypes.SUBTYPE_TAB]: TAB,
    [ElementTypes.SUBTYPE_TABLE_COLUMN]: TABLE_COLUMN,
    [ElementTypes.SUBTYPE_TABLE_ROW]: TABLE_ROW,
    [ElementTypes.SVG_TEXT]: SVG_TEXT
};

export function getRegistryKey(
    definition: ElementDefinition,
): ElementTypes | undefined {

    for (const key in TypeRegistry) {
        if (TypeRegistry[key] === definition) {
            return key as ElementTypes;
        }
    }

    return undefined;
}