import * as BlockProps from '../Block/Block.types';

interface component {
    name: string;
    children:
        | (React.ReactElement<BlockProps.component> | React.ReactElement<component>)
        | (React.ReactElement<BlockProps.component> | React.ReactElement<component>)[];
    categorystyle?: string;
}

interface JSONConfig {
    kind: 'category';
    name: string;
    contents: (JSONConfig | BlockProps.JSONConfig)[];
    categorystyle?: string;
}

export { component, JSONConfig };
