import * as FieldProps from '../Field/Field.types';

/**
 * Built-in inputs
 * {@link https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks#block_inputs}
 */
type component = DummyInput | StatementInput | EndRowInput | ValueInput;

interface BaseInput {
    align?: 'left' | 'right' | 'centre';
    children?:
        | React.ReactElement<FieldProps.component>
        | React.ReactElement<FieldProps.component>[];
}

interface DummyInput extends BaseInput {
    type: 'dummy';
}

interface StatementInput extends BaseInput {
    type: 'statement';
    name: string;
    check?: string;
}

interface EndRowInput extends BaseInput {
    type: 'end-row';
}

interface ValueInput extends BaseInput {
    type: 'input-value';
    name: string;
    check?: string;
}

export { component };
