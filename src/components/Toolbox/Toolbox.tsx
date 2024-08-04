import React, { Children, useCallback, useContext, useEffect } from 'react';
import BlocklyReact from '../../Blockly';
import * as Blockly from 'blockly/core';
import * as ToolboxProps from './Toolbox.types';
import * as BlockProps from '../Block/Block.types';
import * as CategoryProps from '../Category/Category.types';
import ToolboxContext from './ToolboxContext';

const Toolbox: React.FC<ToolboxProps.component> = ({ kind, content, children, ...props }) => {
    const [, set_toolbox] = useContext(ToolboxContext);

    const generate_category_contents = useCallback(
        (
            content: ToolboxProps.component['content']
        ): (CategoryProps.JSONConfig | BlockProps.JSONConfig)[] =>
            content.map((block) =>
                typeof block == 'string'
                    ? {
                          kind: 'block',
                          type: block
                      }
                    : {
                          kind: 'category',
                          name: (
                              block as {
                                  category: string;
                                  content: ToolboxProps.component['content'];
                              }
                          ).category,
                          contents: generate_category_contents(
                              (
                                  block as {
                                      category: string;
                                      content: ToolboxProps.component['content'];
                                  }
                              ).content
                          ),
                          categorystyle: (block as { categorystyle: string }).categorystyle
                      }
            ),
        []
    );

    const generate_flyout_contents = useCallback((content: string[]) => {
        return content.map((type) => {
            return {
                kind: 'block',
                type: type
            };
        });
    }, []);

    useEffect(
        function generateFlyoutToolbox() {
            if (kind == 'categoryToolbox') return;

            const toolbox_def = {
                kind: kind,
                contents: generate_flyout_contents(content)
            };

            set_toolbox(toolbox_def);
        },
        [content]
    );

    useEffect(
        function generateCategoryToolbox() {
            if (kind == 'flyoutToolbox') return;

            const toolbox_def = {
                kind: kind,
                contents: generate_category_contents(content)
            };

            console.debug('toolbox_def', toolbox_def);
            set_toolbox(toolbox_def);
        },
        [content]
    );

    return <>{children}</>;
};

export default Toolbox;
