import * as Blockly from 'blockly/core';
import React from 'react';

interface component {
    type: string;
    decompose: (this: Blockly.Block, workspace: Blockly.WorkspaceSvg) => Blockly.Block;
    compose: (this: Blockly.Block, container_block: Blockly.Block) => void;
    saveExtraState: () => unknown;
    loadExtraState: (state: unknown) => void;
    blockList?: string[];
}

export { component };
