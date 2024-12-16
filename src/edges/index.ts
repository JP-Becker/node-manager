import type { Edge, EdgeTypes } from '@xyflow/react';

export const initialEdges: Edge[] = [
  {
    id: 'option-to-text',
    source: '54e81a0a-e9e0-45ec-be41-1399d9275547',
    sourceHandle: '2fcd8220-3a38-4eba-9663-adac420f81f7',
    target: '0b734a53-7d4e-4b92-8146-bdbccbeec94b',
    animated: false,
  },
];

export const edgeTypes = {
  // Add your custom edge types here!
} satisfies EdgeTypes;
