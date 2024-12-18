import type { Node, BuiltInNode } from '@xyflow/react';

export interface NodeStructure {
    id: string,
    type: string,
    position: {x: number, y: number},
    nextNodeId: string | null,
    content: object,
}

interface MenuOption extends NodeStructure {
    type: 'OPTION';
    content: {
        name: string;
    }
}

export type WebLinkNode = Node<
    {
        url: string;
        title: string;
        text: string;
    },
    'WEBLINK'
>

export type MenuNode = Node<{
    text: string;
    options: {
        id: string;
        type: 'OPTION';
        nextNodeId: string | null;
        content: {
            name: string;
        };
    }[];
}, 'MENU'>;
export type OptionNode = Node<MenuOption['content'], 'OPTION'>;
export type TextNode = Node<{ text: string }, 'TEXT'>;
export type PositionLoggerNode = Node<{ label: string }, 'position-logger'>;
export type AppNode = BuiltInNode | PositionLoggerNode | MenuNode | OptionNode | TextNode | WebLinkNode;