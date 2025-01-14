import type { NodeTypes } from '@xyflow/react';

import { PositionLoggerNode } from './PositionLoggerNode';
import { MenuNode } from './MenuNode';
import { OptionNode } from './OptionNode';
import { TextNode } from './TextNode';
import { AppNode } from './types';
import { WebLinkNode } from './WebLinkNode';
import { ImageNode } from './ImageNode';
import { QuickReplyNode } from './QuickReplyNode';
import { GoToBlockNode } from './GoToBlockNode';

const GO_TO_BLOCK_X = 1800; // posição fixa na direita
const GO_TO_BLOCK_Y_SPACING = 175;

export const initialNodes: AppNode[] = [
  {
    id: '54e81a0a-e9e0-45ec-be41-1399d9275547',
    type: 'MENU',
    position: { x: 0, y: 0 },
    data: {
      text: 'Selecione uma opção:',
      options: [
        {
          id: '2fcd8220-3a38-4eba-9663-adac420f81f7',
          type: 'OPTION',
          nextNodeId: null,
          content: {
            name: 'Guia de compatibilidade',
          },
        },
        {
          id: '4bdbced0-1c7c-4c61-914d-080b3503c3fe',
          type: 'OPTION',
          nextNodeId: null,
          content: {
            name: 'Especificações de produto',
          },
        },
        {
          id: '4bf54792-1498-4b78-b073-178b8bc81376',
          type: 'OPTION',
          nextNodeId: null,
          content: {
            name: 'Guia de instalação',
          },
        },
      ],
    },
  },
  // HORARIO DE ATENDIMENTO (VALIDAÇÃO DE HORARIO ANTES DO CADASTRO)
  {
    id: '12fadfb8-3f6e-4e8c-86cc-32afa4294d40',
    type: 'GO_TO_BLOCK',
    position: { x: GO_TO_BLOCK_X, y: GO_TO_BLOCK_Y_SPACING * 0 },
    data: {
      nextNodeId: 'dca0807f-e431-45f6-b25f-d39fd0f71a01',
      content: {
        id: 'd506f400-22cf-434d-b31c-2c7b9a988fa7',
      }
    }
  },

  // DIRECTOR
  {
    id: 'dca0807f-e431-45f6-b25f-d39fd0f71a01',
    type: 'GO_TO_BLOCK',
    position: { x: GO_TO_BLOCK_X, y: GO_TO_BLOCK_Y_SPACING * 1 },
    data: {
      nextNodeId: null,
      content: {
        id: '329d9c58-bbb8-41d3-9fa1-0a73b736b393',
      },
    }
  },

  // CADASTRO
  {
    id: 'daf6397a-f659-4586-a6f6-306fe2984a19',
    type: 'GO_TO_BLOCK',
    position: { x: GO_TO_BLOCK_X, y: GO_TO_BLOCK_Y_SPACING * 2 },
    data: {
      nextNodeId: '0fda2fc3-b906-404a-bb98-684cad5275dd',
      content: {
        id: '40e3178d-e1be-4f82-b296-73378f7cd53e',
      },
    }
  },

  // HORARIO DE ATENDIMENTO (VALIDAÇÃO DE HORARIO DEPOIS DO CADASTRO)
  {
    id: '0fda2fc3-b906-404a-bb98-684cad5275dd',
    type: 'GO_TO_BLOCK',
    position: { x: GO_TO_BLOCK_X, y: GO_TO_BLOCK_Y_SPACING * 3 },
    data: {
    nextNodeId: 'ca67b49e-0d75-49e8-9ce3-773b6df2059c',
    content: {
      id: 'd506f400-22cf-434d-b31c-2c7b9a988fa7',
    },
  }
  },
  // ATENDIMENTO HUMANO
  {
    id: 'ca67b49e-0d75-49e8-9ce3-773b6df2059c',
    type: 'GO_TO_BLOCK',
    position: { x: GO_TO_BLOCK_X, y: GO_TO_BLOCK_Y_SPACING * 4 },
    data: {
      nextNodeId: null,
      content: {
        id: '252c9326-cffd-430b-b53e-e5cfad89aab8',
      },
    }
  },

  // PESQUISA COM NOTA
  {
    id: '40d3f64f-07b9-4a22-ac21-37848a0ad2e4',
    type: 'GO_TO_BLOCK',
    position: { x: GO_TO_BLOCK_X, y: GO_TO_BLOCK_Y_SPACING * 5 },
    data: {
      nextNodeId: null,
      content: {
        id: '23bcf87c-2b45-4798-8ea8-5ba095b1f2eb',
      },
    }
  },

  // PESQUISA SEM NOTA
  {
    id: '5efb9be7-0b15-4fd0-95f7-6c87605b8fe3',
    type: 'GO_TO_BLOCK',
    position: { x: GO_TO_BLOCK_X, y: GO_TO_BLOCK_Y_SPACING * 6 },
    data: {
      nextNodeId: null,
      content: {
        id: 'fc452091-218e-4e7f-8344-39c249d470f9',
      },
    }
  },

  // ORIGEM
  {
    id: '7ce2f72d-e69e-42a8-b040-a402e83f7304',
    type: 'GO_TO_BLOCK',
    position: { x: GO_TO_BLOCK_X, y: GO_TO_BLOCK_Y_SPACING * 7 },
    data: {
      nextNodeId: null,
      content: {
        id: 'e118b07c-10cb-4404-94d4-834f57bc4dde',
      },
    }
  },
];

export const nodeTypes = {
  'position-logger': PositionLoggerNode,
  MENU: MenuNode,
  OPTION: OptionNode,
  TEXT: TextNode,
  WEBLINK: WebLinkNode,
  IMAGE: ImageNode,
  QUICK_REPLY: QuickReplyNode,
  GO_TO_BLOCK: GoToBlockNode,
} satisfies NodeTypes;

export type AvailableNodeTypes = keyof typeof nodeTypes;
