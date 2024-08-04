import * as Blockly from 'blockly/core';
import React, { StrictMode, useEffect, useRef, useState } from 'react';

import WorkspaceContext from './WorkspaceContext';
import ToolboxContext from '../Toolbox/ToolboxContext';
import GeneratorContext from './GeneratorContext';

import * as WorkspaceProps from './Workspace.types';

const Workspace: React.FC<WorkspaceProps.component> = ({
    className,
    config,
    children,
    extensions,
    Msg,
    context,
    generator,
    addChangeListener
}) => {
    const workspace_ref = useRef<HTMLDivElement>();
    const [workspace, set_workspace] = useState<Blockly.WorkspaceSvg>();
    const [toolbox, set_toolbox] = useState<Blockly.utils.toolbox.ToolboxDefinition>();
    const [code_generator, set_code_generataor] = useState<Blockly.CodeGenerator>();

    useEffect(
        function populateExtensions() {
            if (!extensions) return;

            Object.keys(extensions).forEach((name) => {
                Blockly.Extensions.register(name, function () {
                    extensions[name](this);
                });
            });

            return () => {
                Object.keys(extensions).forEach((name) => {
                    Blockly.Extensions.unregister(name);
                });
            };
        },
        [extensions]
    );

    useEffect(
        function populateMsg() {
            if (!Msg) return;

            Object.keys(Msg).map((key) => {
                Blockly.Msg[key] = Msg[key];
            });

            return () => {
                Object.keys(Msg).map((key) => {
                    delete Blockly.Msg[key];
                });
            };
        },
        [Msg]
    );

    useEffect(
        function populateContextMenu() {
            if (!context) return;
            Blockly.ContextMenuRegistry.registry.reset();

            context.forEach((context_item) => {
                Blockly.ContextMenuRegistry.registry.register(context_item);
            });

            return () => {
                context.forEach((context_item) => {
                    Blockly.ContextMenuRegistry.registry.unregister(context_item.id);
                });
            };
        },
        [context]
    );

    useEffect(
        function populateCodeGenerator() {
            if (!generator || !workspace) return;

            set_code_generataor(generator);
        },
        [workspace, generator]
    );

    useEffect(
        function populateToolbox() {
            if (!toolbox) return;

            if (!workspace) {
                const workspace = Blockly.inject(workspace_ref.current, {
                    ...config,
                    toolbox: toolbox
                });

                set_workspace(workspace);
            } else {
                workspace.updateToolbox(toolbox);
            }
        },
        [workspace, toolbox]
    );

    useEffect(
        function populateChangeListener() {
            if (!workspace || !addChangeListener) return;

            const wrapper = (event: Blockly.Events.Abstract) => {
                addChangeListener(event, workspace, generator);
            };
            workspace.addChangeListener(wrapper);

            return () => {
                workspace.removeChangeListener(wrapper);
            };
        },
        [workspace, generator, addChangeListener]
    );

    return (
        <StrictMode>
            <WorkspaceContext.Provider value={workspace}>
                <div className={className} ref={workspace_ref}></div>
                <GeneratorContext.Provider value={code_generator}>
                    <ToolboxContext.Provider value={[toolbox, set_toolbox]}>
                        {children}
                    </ToolboxContext.Provider>
                </GeneratorContext.Provider>
            </WorkspaceContext.Provider>
        </StrictMode>
    );
};

export default Workspace;
