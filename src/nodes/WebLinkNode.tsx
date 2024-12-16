import { Handle, Position, type NodeProps } from '@xyflow/react';
import { WebLinkNode as WebLinkNodeType } from './types';

export function WebLinkNode({ data }: NodeProps<WebLinkNodeType>) {
  return (
    <div className="react-flow__node-default" style={{ minWidth: '200px' }}>
      <Handle type="target" position={Position.Top} />

      <div style={{ marginBottom: '4px', color: '#555', fontSize: '12px', fontWeight: 'bold' }}>Título:</div>
      <div style={{ marginBottom: '8px' }}>{data.title}</div>

      <div style={{ marginBottom: '4px', color: '#555', fontSize: '12px', fontWeight: 'bold' }}>Descrição:</div>
      <div style={{ marginBottom: '8px' }}>{data.text}</div>

      <div style={{ marginBottom: '4px', color: '#555', fontSize: '12px', fontWeight: 'bold' }}>URL:</div>
      <a
        href={data.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#0066cc', textDecoration: 'underline' }}
      >
        {data.url}
      </a>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
