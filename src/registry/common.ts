export interface CommonFields {
    uid: boolean;
    classes: boolean;
    attributes: boolean;
    parameters: boolean;
    children: boolean;
}

export const commonFields: CommonFields = {
    uid: true,
    classes: true,
    attributes: true,
    parameters: true,
    children: true
};

export const commonExample = {
    uid: "optional",
    classes: [],
    attributes: {},
    parameters: {},
    children: []
};
