import React, { Children, useCallback, useContext, useEffect, useState } from 'react';
import * as Blockly from 'blockly/core';
import BlocklyReact from '../../Blockly';

import * as InputProps from '../Input/Input.types';
import * as BlockProps from './Block.types';
import * as FieldProps from '../Field/Field.types';

import GeneratorContext from '../Workspace/GeneratorContext';
import WorkspaceContext from '../Workspace/WorkspaceContext';

const Block: React.FC<BlockProps.component> = ({
    type,
    colour,

    output,
    PreviousStatement,
    NextStatement,

    tooltip,
    helpUrl,

    inputsInline,

    style,

    extensions,
    mutator,

    children,

    generator,
    destroy,

    decompose,
    compose,
    saveExtraState,
    loadExtraState
}) => {
    const [block_json_def, set_block_json_def] = useState({});
    const code_generator = useContext(GeneratorContext);
    const workspace = useContext(WorkspaceContext);

    useEffect(
        function populateGenerator() {
            if (!generator || !code_generator) return;

            code_generator.forBlock[type] = generator;

            return () => {
                delete code_generator.forBlock[type];
            };
        },
        [generator, code_generator, type]
    );

    useEffect(
        function recreateBlock() {
            if (!workspace) return;

            const all_blocks = workspace.getAllBlocks().filter((b) => b.type == type);

            all_blocks.forEach((block) => {
                const coordinates = block.getRelativeToSurfaceXY();
                console.debug('block ', block);
                block.dispose();
                workspace.removeBlockById(block.id);

                const new_block = workspace.newBlock(type, block.id);

                new_block.moveTo(coordinates);
                new_block.initSvg();
            });
        },
        [workspace, block_json_def, type]
    );

    useEffect(
        function generateBlock() {
            const blocks = Blockly.Blocks;
            if (!blocks) return;

            let message0 = '';
            const args0: {
                type: `field_${string}` | `input_${string}`;
                [props: string]: unknown;
            }[] = [];

            Children.toArray(children).forEach(
                (input: React.ReactElement<InputProps.component>) => {
                    if (!React.isValidElement(input)) return;

                    Children.toArray(
                        (input as React.ReactElement<InputProps.component>).props.children
                    ).forEach((field: React.ReactElement<FieldProps.component>) => {
                        if (!React.isValidElement(field)) return;

                        if (field.type == BlocklyReact.Field) {
                            switch (field.props.type) {
                                case 'text':
                                    message0 += ` ${field.props.value} `;
                                    break;
                                case 'number':
                                    args0.push({
                                        type: 'field_number',
                                        name: field.props.name,
                                        value: field.props.value,
                                        min: field.props.min,
                                        max: field.props.max
                                    });

                                    message0 += ` %${args0.length}`;
                                    break;
                                case 'checkbox':
                                    args0.push({
                                        type: 'field_checkbox',
                                        name: field.props.name,
                                        checked: field.props.checked
                                    });

                                    message0 += ` %${args0.length}`;
                                    break;
                                case 'image':
                                    args0.push({
                                        type: 'field_image',
                                        src: field.props.url,
                                        width: field.props.width,
                                        height: field.props.height,
                                        alt: field.props.alt,
                                        flipRtl: field.props.flip
                                    });

                                    message0 += ` %${args0.length}`;
                                    break;
                                case 'dropdown':
                                    args0.push({
                                        type: 'field_dropdown',
                                        name: field.props.name,
                                        options: Object.entries(field.props.options)
                                    });

                                    message0 += ` %${args0.length}`;
                                    break;
                                case 'variable':
                                    args0.push({
                                        type: 'field_variable',
                                        name: field.props.name,
                                        variable: field.props.variable
                                    });

                                    message0 += ` %${args0.length}`;
                                    break;
                                case 'label':
                                    args0.push({
                                        type: 'field_label_serializable',
                                        name: field.props.name,
                                        text: field.props.text
                                    });

                                    message0 += ` %${args0.length}`;
                                    break;
                            }
                        }
                    });

                    if (input.type == BlocklyReact.Input) {
                        input = input as React.ReactElement<InputProps.component>;
                        switch (input.props.type) {
                            case 'dummy':
                                args0.push({
                                    type: 'input_dummy'
                                });

                                message0 += ` %${args0.length}`;
                                break;

                            case 'input-value':
                                args0.push({
                                    type: 'input_value',
                                    name: input.props.name,
                                    check: input.props.check
                                });

                                message0 += ` %${args0.length}`;
                                break;

                            case 'end-row':
                                args0.push({
                                    type: 'input_end_row'
                                });

                                message0 += ` %${args0.length}`;
                                break;
                            case 'statement':
                                args0.push({
                                    type: 'input_statement',
                                    name: input.props.name,
                                    check: input.props.check
                                });

                                message0 += ` %${args0.length}`;
                                break;
                        }
                    }
                }
            );

            const block_def = Blockly.common.createBlockDefinitionsFromJsonArray([
                {
                    type: type,
                    message0: message0,
                    args0: args0,
                    colour: colour || 0,
                    output: output,
                    previousStatement: PreviousStatement,
                    nextStatement: NextStatement,
                    extensions: extensions,
                    tooltip,
                    helpUrl,
                    inputsInline,
                    style,
                    mutator
                }
            ]);

            if (destroy) block_def[type].destroy = destroy;
            if (saveExtraState) block_def[type].saveExtraState = saveExtraState;
            if (loadExtraState) block_def[type].loadExtraState = loadExtraState;

            Blockly.Blocks[type] = block_def[type];

            set_block_json_def(block_def[type]);

            return () => {};
        },
        [
            children,
            type,
            colour,
            PreviousStatement,
            NextStatement,
            extensions,
            tooltip,
            helpUrl,
            inputsInline,
            style,
            destroy,
            saveExtraState,
            loadExtraState,
            mutator
        ]
    );

    return <>{children}</>;
};

export default Block;
