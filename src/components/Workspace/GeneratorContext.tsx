import { createContext } from 'react';
import Blockly from 'blockly';

const GeneratorContext = createContext<Blockly.CodeGenerator>(undefined);

export default GeneratorContext;
