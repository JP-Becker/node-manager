import type { Node, BuiltInNode } from '@xyflow/react';

export interface NodeStructure {
    id: string,
    type: string,
    position: { x: number, y: number },
    nextNodeId: string | null,
    content: object,
}

export interface MenuOptionData {
    id: string;
    type: 'OPTION';
    nextNodeId: string | null;
    content: {
        name: string;
    };
}

export type WebLinkNode = Node<
    {
        nextNodeId: string | null;
        content: {
            url: string;
            title: string;
            text: string;
        }
    },
    'WEBLINK'
>;

export type TextNode = Node<
    {
        nextNodeId: string | null;
        content: {
            text: string;
        }
    }, 'TEXT'
>;

export type ImageNode = Node<
    {
        nextNodeId: string | null;
        content: {
            url: string;
            title: string;
            text: string;
        }
    },
    'IMAGE'
>;

export type MenuNode = Node<{
    text: string;
    options: MenuOptionData[];
}, 'MENU'>;

export type QuickReplyNode = Node<{
    text: string;
    options: MenuOptionData[];
}, 'QUICK_REPLY'>;

export type GoToBlockNode = Node<{
    nextNodeId: string | null;
    content: {
        id: string;
    }
}, 'GO_TO_BLOCK'>  & { draggable?: boolean; deletable?: boolean; selectable?: boolean };

export type OptionNode = Node<MenuOptionData['content'], 'OPTION'>;

export type PositionLoggerNode = Node<{ label: string }, 'position-logger'>;

export type AiAgentNode = Node<{
    nextNodeId: string | null;
    content: {
        endpoint: string;
        instruction: string;
        useFallback: boolean;
        fallbackMessage: string | null;
    }
}, 'AI_AGENT'>;

export type AppNode = BuiltInNode | PositionLoggerNode | MenuNode | OptionNode | TextNode | WebLinkNode | ImageNode | QuickReplyNode | GoToBlockNode | AiAgentNode;