# WIP Blockly React

React implementation for Block based code editor Blockly.


## Features

-   Toolbox and blocks definition at the same time.
-   Extension callback support.
-   Msg implementation.
-   Context menu.
-   Code generator.

## Work to do

- mutators.
- serializers.
- custom field implementation.
- Comments.
- plugins

## How to Build

```bash
npm run build 
```

## usage
Here’s a basic example of how to use the Blockly-react components:

![image](https://github.com/user-attachments/assets/3b2bf1d6-b081-4755-bb46-92c229991bd7)


```jsx
import BlocklyReact from './src/Blockly';
import React, { useEffect, useState } from 'react';
import * as Blockly from 'blockly/core';

const Controls_if_Mutator = () => {
    const [base_block, set_base_block] = useState<Blockly.Block>();
    const [else_if_inputs, set_else_if_inputs] = useState(0);
    const [else_input, set_else_input] = useState(false);

    useEffect(() => {
        if (!base_block) return;

        base_block.inputList
            .map((i) => i.name)
            .forEach((input) => {
                if (!(input == 'if' || input == 'do')) {
                    base_block.removeInput(input);
                }
            });

        console.debug(base_block.inputList, else_if_inputs, 'input list');

        for (let i = 0; i < else_if_inputs; i++) {
            base_block.appendValueInput(`if-${i}`).appendField('else if');
            base_block.appendStatementInput(`if-do-${i}`).appendField('do');
        }

        if (else_input) {
            base_block.appendStatementInput('else').appendField('else');
        }
    }, [else_if_inputs, else_input, base_block]);

    return (
        <>
            <BlocklyReact.Block type="controls_if_if" NextStatement={null} style="logic_blocks">
                <BlocklyReact.Input type="dummy">
                    <BlocklyReact.Field type="text" value="if" />
                </BlocklyReact.Input>
            </BlocklyReact.Block>

            <BlocklyReact.Block
                type="controls_if_else"
                PreviousStatement={null}
                style="logic_blocks">
                <BlocklyReact.Input type="dummy">
                    <BlocklyReact.Field type="text" value="else" />
                </BlocklyReact.Input>
            </BlocklyReact.Block>

            <BlocklyReact.Block
                type="controls_if_else_if"
                PreviousStatement={null}
                NextStatement={null}
                style="logic_blocks">
                <BlocklyReact.Input type="dummy">
                    <BlocklyReact.Field type="text" value="else if" />
                </BlocklyReact.Input>
            </BlocklyReact.Block>

            <BlocklyReact.Mutator
                type="controls_if_mutator"
                decompose={function (workspace) {
                    const block = workspace.newBlock('controls_if_if');
                    block.initSvg();

                    set_base_block(this);

                    return block;
                }}
                compose={function (block) {
                    let next_conn = block.getNextBlock();

                    let controls_if_else_if_number = 0;
                    let contains_else = false;

                    while (next_conn != null) {
                        console.debug(next_conn?.type, 'type');

                        if (next_conn?.type == 'controls_if_else_if') {
                            controls_if_else_if_number++;
                        } else if (next_conn?.type == 'controls_if_else') {
                            contains_else = true;
                        }

                        next_conn = next_conn.getNextBlock();
                    }

                    set_else_if_inputs(controls_if_else_if_number);
                    set_else_input(() => contains_else);
                }}
                saveExtraState={() => {}}
                loadExtraState={(state) => {}}
                blockList={['controls_if_else_if', 'controls_if_else']}></BlocklyReact.Mutator>
        </>
    );
};

const Demo = () => {
    return (
        <BlocklyReact.Workspace
            className="workspace"
            config={{
                grid: {
                    spacing: 20,
                    length: 3,
                    colour: '#ccc',
                    snap: true
                }
            }}>
            <BlocklyReact.Toolbox
                kind="categoryToolbox"
                content={[
                    {
                        category: 'Logic',
                        content: ['controls_if'],
                        categorystyle: 'logic_category'
                    }
                ]}
            />

            <BlocklyReact.Block
                type="controls_if"
                PreviousStatement={null}
                NextStatement={null}
                style="logic_blocks"
                mutator="controls_if_mutator">
                <BlocklyReact.Input name="if" type="input-value" check="Boolean">
                    <BlocklyReact.Field type="text" value="if" />
                </BlocklyReact.Input>
                <BlocklyReact.Input name="do" type="statement">
                    <BlocklyReact.Field type="text" value="do" />
                </BlocklyReact.Input>

                <Controls_if_Mutator />
            </BlocklyReact.Block>
        </BlocklyReact.Workspace>
    );
};

```
