# Change Log

All notable changes to the "ged-language-tools" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [1.0.1]

### Added

- InputSlider: parameters customValues and marks, value also accepts strings
- ContainerBurger: parameter btnClass
- SubtypeBurgerItem: parameter iconSize
- ContainerButtonIcon: parameter alt
- ContainerContent: parameter direction
- InputTextfield: parameter onKeydown
- InputTextarea: parameters onKeydown, rows, cols
- Setting ignoredPaths: skips validation for matching files
- SubtypeTableColumn: columns of a table with name, sortable, sortType, sortBy, defaultSort and tooltip
- ContainerTable: parameter striped
- SubtypeTab: tabs of a tabbed container with name, tooltip, selected and disabled
- ContainerTabbed: parameters position and elementSourceIsList, tab children
- InputHidden: parameter signed

### Changed

- ContainerContent, ContainerHidden, ContainerSplitted, ContainerModal: tabbed allowed as child

### Fixed

- elementSource reference text
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
