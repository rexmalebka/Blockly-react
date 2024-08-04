import React from 'react';
import * as Blockly from 'blockly/core';
import * as InputProps from '../Input/Input.types';

interface component {
    type: string;
    colour?: number;

    output?: null | string | string[];
    PreviousStatement?: null | string | string[];
    NextStatement?: null | string | string[];

    tooltip?: string;
    helpUrl?: string;

    inputsInline?: boolean;
    style?: string;

    extensions?: string[];
    mutator?: string;

    children?:
        | React.ReactElement<InputProps.component>
        | React.ReactElement<InputProps.component>[];
    generator?: (
        block: Blockly.Block,
        generator: Blockly.CodeGenerator
    ) => string | [string, number];

    destroy?: () => void;

    decompose?: (this: Blockly.Block, workspace: Blockly.WorkspaceSvg) => void;
    compose?: (this: Blockly.Block, container_block: Blockly.Block) => void;
    saveExtraState?: (this: Blockly.Block) => void;
    loadExtraState?: (this: Blockly.Block, state: unknown) => void;
}

interface block {
    init: () => void;
}

interface JSONConfig {
    kind: 'block';
    type: string;
}

export { component, block, JSONConfig };
