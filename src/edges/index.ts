import type { Edge, EdgeTypes } from '@xyflow/react';
import {CustomEdge} from './CustomEdge';

export const initialEdges: Edge[] = [
 
];

export const edgeTypes = {
  custom: CustomEdge,
} satisfies EdgeTypes;
