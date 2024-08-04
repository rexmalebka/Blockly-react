import { createContext } from 'react';
import * as Blockly from 'blockly/core';

const ToolboxContext = createContext<
    [
        Blockly.utils.toolbox.ToolboxDefinition,
        React.Dispatch<React.SetStateAction<Blockly.utils.toolbox.ToolboxDefinition>>
    ]
>([undefined, () => {}]);

export default ToolboxContext;
