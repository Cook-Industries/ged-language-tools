export interface GedElement {
    uid?: string;

    type: string;

    classes?: string[];

    attributes?: Record<string, string | number | boolean>;

    parameters?: Record<string, string | number | boolean | Array<string | number>>;

    children: GedElement[];
}
