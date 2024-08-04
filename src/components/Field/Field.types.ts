/**
 * Bult-in fields
 * {@link https://developers.google.com/blockly/guides/create-custom-blocks/fields/built-in-fields/overview}
 * Custom fields not supported
 */

type component = field &
    (
        | TextField
        | LabelField
        | NumericField
        | CheckboxField
        | DropdownField
        | VariableField
        | ImageField
    );

interface field {
    children?: React.ReactElement;
}

interface TextField {
    type: 'text';
    value: string;
}

interface LabelField {
    type: 'label';
    name: string;
    text: string;
}

interface NumericField {
    type: 'number';
    name: string;
    value?: number;
    min?: number;
    max?: number;
    precision?: number;
}

interface CheckboxField {
    type: 'checkbox';
    name: string;
    checked?: boolean;
}

interface VariableField {
    type: 'variable';
    name: string;
    variable: string;
}

interface ImageField {
    type: 'image';
    url: string;
    width: number;
    height: number;
    alt?: string;
    flip?: boolean;
}

interface DropdownField {
    type: 'dropdown';
    name: string;
    options: {
        [variable: string]: string;
    };
}
export { component };
