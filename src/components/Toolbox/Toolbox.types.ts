import * as BlockProps from '../Block/Block.types';
import * as CategoryProps from '../Category/Category.types';

type CategoryBlocks = {
    category: string;
    content: string[] | CategoryBlocks;
    categorystyle?: string;
}[];

interface Category {
    kind: 'categoryToolbox';
    content: CategoryBlocks;
    categorystyle?: string;
    children?: React.ReactElement[];
}

interface Flyout {
    kind: 'flyoutToolbox';
    blocks: string[];
    content?: string[];
    children?: React.ReactElement[];
}

/**
 * Toolbox configuraton.
 * {@link https://developers.google.com/blockly/guides/configure/web/toolbox}
 */

type component = Category | Flyout;

interface FlyoutJSON {
    kind: 'flyoutToolbox';
    contents: BlockProps.JSONConfig[];
}

interface CategoryJSON {
    kind: 'categoryToolbox';
    contents: CategoryProps.JSONConfig[];
}

export { component, CategoryJSON, FlyoutJSON };
