import type { Node, BuiltInNode } from '@xyflow/react';

interface MenuOption {
  id: string;
  type: 'OPTION';
  nextNodeId: string | null;
  content: {
    name: string;
  };
}

export type WebLinkNode = Node<
  {
    url: string;
    title: string;
    text: string;
  },
  'WEBLINK'
>;

export type MenuNode = Node<{ text: string; options: MenuOption[] }, 'MENU'>;
export type OptionNode = Node<MenuOption['content'], 'OPTION'>;
export type TextNode = Node<{ text: string }, 'TEXT'>;
export type PositionLoggerNode = Node<{ label: string }, 'position-logger'>;
export type AppNode = BuiltInNode | PositionLoggerNode | MenuNode | OptionNode | TextNode | WebLinkNode;
