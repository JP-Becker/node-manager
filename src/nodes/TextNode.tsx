import { Handle, Position, type NodeProps } from '@xyflow/react';
import { TextNode as TextNodeType } from './types';

export function TextNode({ data }: NodeProps<TextNodeType>) {
  return (
    <div className="react-flow__node-default" style={{ minWidth: '200px' }}>
      <Handle type="target" position={Position.Top} />
      <div style={{ marginBottom: '8px', color: '#555', fontSize: '12px', fontWeight: 'bold' }}>Texto:</div>
      <div>{data.content.text}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
