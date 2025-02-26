import { Handle, Position, type NodeProps, useReactFlow, NodeToolbar } from '@xyflow/react';
import { ImageNode as ImageNodeType } from './types';
import { getRandomOffset } from '../components/functions/getRandomOffset';

export function ImageNode({ data, id }: NodeProps<ImageNodeType>) {
  const { setNodes, deleteElements } = useReactFlow();

  const handleChange = (field: 'title' | 'text' | 'url') => (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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

  const handleDuplicate = () => {
    const newNode = {
      id: crypto.randomUUID(),
      type: 'IMAGE',
      position: { x: getRandomOffset(), y: getRandomOffset() },
      data: {
        nextNodeId: null,
        content: {
          url: data.content.url,
          title: data.content.title,
          text: data.content.text,
        }
      },
    }

    setNodes((nodes) => [...nodes, newNode]);
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
          Deletar
        </button>
        <button 
          onClick={handleDuplicate}
          className="toolbar-button toolbar-button-copy"
        >
          Duplicar
        </button>
      </NodeToolbar>

      <Handle 
        type="target" 
        position={Position.Left} 
        style={{ width: '15px', height: '15px', background: '#f5f5f5' }}
      />

      <div style={{ marginBottom: '4px', color: '#555', fontSize: '12px', fontWeight: 'bold' }}>Título:</div>
      <textarea
        value={data.content.title}
        onChange={handleChange('title')}
        className='normal-textarea'
      />

      <div style={{ marginBottom: '4px', color: '#555', fontSize: '12px', fontWeight: 'bold' }}>Descrição:</div>
      <textarea
        value={data.content.text}
        onChange={handleChange('text')}
        className='normal-textarea'
      />

      <div style={{ marginBottom: '4px', color: '#555', fontSize: '12px', fontWeight: 'bold' }}>URL da Imagem:</div>
      <textarea
        value={data.content.url}
        onChange={handleChange('url')}
        className='normal-textarea'
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        style={{ width: '15px', height: '15px', background: '#f5f5f5' }}
      />
    </div>
  );
}
