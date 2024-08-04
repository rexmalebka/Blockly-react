import React, { useEffect, useState } from 'react';
import * as MutatorProps from '../Mutator/Mutator.types';
import * as Blockly from 'blockly/core';

const Mutator: React.FC<MutatorProps.component> = ({
    type,
    decompose,
    compose,
    saveExtraState,
    loadExtraState,
    blockList
}) => {
    const [mutator_workspace, set_mutator_workspace] = useState<Blockly.WorkspaceSvg>();

    useEffect(() => {
        Blockly.Extensions.registerMutator(
            type,
            {
                decompose,
                compose,
                saveExtraState,
                loadExtraState
            },
            null,
            blockList
        );

        return () => {
            Blockly.Extensions.unregister(type);
        };
    }, [type, decompose, compose, saveExtraState, loadExtraState, blockList]);

    useEffect(() => {
        if (!mutator_workspace) return;

        mutator_workspace.clear();
    }, [mutator_workspace]);

    return <></>;
};

export default Mutator;
