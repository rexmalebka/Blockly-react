import { Events, BlocklyOptions, WorkspaceSvg } from 'blockly';
import { RegistryItem } from 'blockly/core/contextmenu_registry';
import * as Blockly from 'blockly/core';
import * as ToolboxProps from '../Toolbox/Toolbox.types';

interface component {
    className: string;

    /**
     * Basic configuration for Blockly workspace.
     * {@link https://developers.google.com/blockly/reference/js/blockly.blocklyoptions_interface}
     */
    config?: BlocklyOptions;
    children?:
        | React.ReactElement<ToolboxProps.component>
        | React.ReactElement<ToolboxProps.component>[];

    /**
     * Object for Context menu.
     * {@link https://developers.google.com/blockly/guides/configure/web/context-menus}
     */
    context?: RegistryItem[];

    /**
     * Change listener for all blockly events.
     * {@link https://developers.google.com/blockly/reference/js/blockly.events_namespace}
     * @param evt - change event
     * @param Workspace - blockly workspace
     * @param generator - workspace generator
     * @returns void
     */
    addChangeListener?: (
        evt: Events.Abstract,
        Workspace?: WorkspaceSvg,
        generator?: Blockly.CodeGenerator
    ) => void;

    /**
     * Extensions object for blocks.
     * Mutators are still not implemented
     * {@link https://developers.google.com/blockly/guides/create-custom-blocks/extensions}
     */
    extensions?: {
        [name: string]: (block: Blockly.Block) => void;
    };

    /**
     * Msg object for localised messages.
     * {@link https://developers.google.com/blockly/reference/js/blockly.msg_variable}
     */
    Msg?: {
        [name: string]: string;
    };

    /**
     * Generator object for code generation.
     * {@link https://developers.google.com/blockly/guides/create-custom-blocks/code-generation/overview}
     */
    generator?: Blockly.CodeGenerator;
}
export { component };
