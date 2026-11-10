# Change Log

All notable changes to the "ged-language-tools" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [1.0.1]

### Added

- InputSlider: parameters customValues and marks, value also accepts strings
- ContainerBurger: parameter btnClass
- SubtypeBurgerItem: parameter iconSize
- ContainerButtonIcon: parameter alt
- ContainerImage: parameter alt
- ContainerContent: parameter direction
- InputTextfield: parameter onKeydown
- InputTextarea: parameters onKeydown, rows, cols
- Setting ignoredPaths: skips validation for matching files
- SubtypeTableColumn: columns of a table with name, sortable, sortType, sortBy, defaultSort and tooltip
- ContainerTable: parameter striped
- SubtypeTab: tabs of a tabbed container with name, tooltip, selected and disabled
- ContainerTabbed: parameters position and elementSourceIsList, tab children
- InputHidden: parameter signed
- Replacement values: $$text$<key>|<name> names the token value with the placeholder values of the text
- InputGroup: input_group with name, groupKey, mode, direction and tooltip, children limited to date, number, radio, select, tag, textarea and textfield
- InputGroup: an input written in the group with mandatory true or with the groupKey as submitAs is an error
- InputSelect: parameter placeholder
- ContainerMenubar: menubar with position, direction, image, imageAlt and imageHref, children menu, menu_link, menu_item and menu_separator
- SubtypeMenu, SubtypeMenuLink, SubtypeMenuItem, SubtypeMenuSeparator: entries of a menubar with text, icon, iconOnly and end, a menu holds entries

### Changed

- ContainerContent, ContainerHidden, ContainerSplitted, ContainerModal: tabbed allowed as child
- ContainerForm: input_group allowed as child
- ContainerContent, ContainerHidden, ContainerSplitted: menubar allowed as child
- ContainerButton, ContainerButtonIcon, ContainerModal, InputTextfield, InputTextarea, inputs with onInput: event parameters only accept a $$function$ token
- ContainerButton, ContainerButtonIcon: parameter onClick is optional

### Fixed

- elementSource reference text
- unknown replacement identifier message lists class
- hint text in InputTextarea
- added $$class$ replacer value
- writing error on btnClass enum value
- generalized btnClass to CommonParameters
- removed parameters from InputTextField
- updated numeric fields InputNumber, InputSlider
- fixed several parameter names
- extracted parameters to common

## [1.0.0] - 2026-08-31

### Added

- General functionality
- added supported ci-lib-spring-gui version: 4.0.0
- Auto-complete
- Error highligthing
- Changelog
