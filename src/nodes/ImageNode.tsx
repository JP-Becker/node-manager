import { Handle, Position, type NodeProps, useReactFlow, NodeToolbar } from '@xyflow/react';
import { ImageNode as ImageNodeType } from './types';

export function ImageNode({ data, id }: NodeProps<ImageNodeType>) {
  const { setNodes, deleteElements } = useReactFlow();

  const handleChange = (field: 'title' | 'text' | 'url') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          const typedNode = node as ImageNodeType;
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

  const handleDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };

  return (
    <div className="react-flow__node-default" style={{ minWidth: '200px' }}>
      <h2>NODE DE IMAGEM</h2>
      <NodeToolbar 
        isVisible={data.toolbarVisible} 
        position={data.toolbarPosition}
        style={{ display: 'flex', gap: '8px' }}
      >
        <button 
          onClick={handleDelete}
          className="toolbar-button toolbar-button-delete"
        >
          Delete
        </button>
        <button 
          className="toolbar-button toolbar-button-copy"
        >
          Copy
        </button>
      </NodeToolbar>

      <Handle 
        type="target" 
        position={Position.Left} 
        style={{ width: '15px', height: '15px', background: '#f5f5f5' }}
      />

      <div style={{ marginBottom: '4px', color: '#555', fontSize: '12px', fontWeight: 'bold' }}>Título:</div>
      <input
        value={data.content.title}
        onChange={handleChange('title')}
        style={{
          width: '100%',
          marginBottom: '8px',
          textAlign: 'center',
          border: '1px solid black',
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
          border: '1px solid black',
          background: 'transparent'
        }}
      />

      <div style={{ marginBottom: '4px', color: '#555', fontSize: '12px', fontWeight: 'bold' }}>URL da Imagem:</div>
      <input
        value={data.content.url}
        onChange={handleChange('url')}
        style={{
          width: '100%',
          color: '#0066cc',
          textAlign: 'center',
          textDecoration: 'underline',
          border: '1px solid black',
          background: 'transparent'
        }}
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        style={{ width: '15px', height: '15px', background: '#f5f5f5' }}
      />
    </div>
  );
}
