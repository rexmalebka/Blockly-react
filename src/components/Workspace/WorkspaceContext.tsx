import { createContext } from 'react';
import Blockly from 'blockly';

const WorkspaceContext = createContext<Blockly.WorkspaceSvg>(undefined);

export default WorkspaceContext;
