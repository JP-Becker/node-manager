import type { NodeTypes } from '@xyflow/react';

import { PositionLoggerNode } from './PositionLoggerNode';
import { MenuNode } from './MenuNode';
import { OptionNode } from './OptionNode';
import { TextNode } from './TextNode';
import { AppNode } from './types';
import { WebLinkNode } from './WebLinkNode';

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
          nextNodeId: '0b734a53-7d4e-4b92-8146-bdbccbeec94b',
          content: {
            name: 'Guia de compatibilidade',
          },
        },
        {
          id: '4bdbced0-1c7c-4c61-914d-080b3503c3fe',
          type: 'OPTION',
          nextNodeId: '2f86d307-d88d-4bb1-aadd-51f60dbd0392',
          content: {
            name: 'Especificações de produto',
          },
        },
        {
          id: '4bf54792-1498-4b78-b073-178b8bc81376',
          type: 'OPTION',
          nextNodeId: 'f2095179-39aa-467d-96a7-3205378f86f4',
          content: {
            name: 'Guia de instalação',
          },
        },
      ],
    },
  },
  {
    id: '0b734a53-7d4e-4b92-8146-bdbccbeec94b',
    type: 'TEXT',
    position: { x: 0, y: 200 },
    data: {
      text: '🌐 Para acesso ao manual de instalação, acesse o link abaixo:',
    },
  },
  {
    id: 'f9e1677c-7905-4670-bef2-3d18c162a4f9',
    type: 'WEBLINK',
    position: { x: 0, y: 400 },
    data: {
      url: 'https://manuais-switches.intelbras.com.br/pt-BR/Dashboard_Redes/tabela.html',
      title: 'Suporte Redes',
      text: 'Manuais disponíveis',
    },
  },
];

export const nodeTypes = {
  'position-logger': PositionLoggerNode,
  'MENU': MenuNode,
  'OPTION': OptionNode,
  'TEXT': TextNode,
  'WEBLINK': WebLinkNode,
} satisfies NodeTypes;
