import { Handle, Position, type NodeProps, useReactFlow } from '@xyflow/react';
import { WebLinkNode as WebLinkNodeType } from './types';

export function WebLinkNode({ data, id }: NodeProps<WebLinkNodeType>) {
  const { setNodes } = useReactFlow();

  const handleChange = (field: 'title' | 'text' | 'url') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setNodes((nodes) => 
      nodes.map((node) => {
        if (node.id === id) {
          const typedNode = node as WebLinkNodeType;
          return {
            ...node,
            data: {
              ...typedNode.data,
              content: {
                ...typedNode.data.content,
                [field]: newValue
              }
            }
          };
        }
        return node;
      })
    );
  };

  return (
    <div className="react-flow__node-default" style={{ minWidth: '200px' }}>
      <Handle type="target" position={Position.Top} />

      <div style={{ marginBottom: '4px', color: '#555', fontSize: '12px', fontWeight: 'bold' }}>Título:</div>
      <input
        value={data.content.title}
        onChange={handleChange('title')}
        style={{ 
          width: '100%',
          marginBottom: '8px',
          textAlign: 'center',
          border: 'none',
          background: 'transparent'
        }}
      />

      <div style={{ marginBottom: '4px', color: '#555', fontSize: '12px', fontWeight: 'bold' }}>Descrição:</div>
      <input
        value={data.content.text}
        onChange={handleChange('text')}
        style={{ 
          width: '100%',
          marginBottom: '8px',
          textAlign: 'center',
          border: 'none',
          background: 'transparent'
        }}
      />

      <div style={{ marginBottom: '4px', color: '#555', fontSize: '12px', fontWeight: 'bold' }}>URL:</div>
      <input
        value={data.content.url}
        onChange={handleChange('url')}
        style={{ 
          width: '100%',
          color: '#0066cc',
          textAlign: 'center',
          textDecoration: 'underline',
          border: 'none',
          background: 'transparent'
        }}
      />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
