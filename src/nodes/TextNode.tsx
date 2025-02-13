import { Handle, Position, useReactFlow, type NodeProps, Node, NodeToolbar } from '@xyflow/react';
import { TextNode as TextNodeType } from './types';

export function TextNode({ data, id, position }: NodeProps<TextNodeType>) {
  const { setNodes, deleteElements } = useReactFlow();

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setNodes((nodes: Node[]) => 
      nodes.map((node: Node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              content: {
                ...node.data.content,
                text: newText
              }
            }
          };
        }
        return node;
      })
    );
  };

  const handleDelete = () => {
    const confirmDelete = confirm('Tem certeza que deseja deletar o node?')
    
    if (confirmDelete) {
      deleteElements({ nodes: [{ id }] });
    }
  };

  console.log(position);

  const handleDuplicate = () => {

    const newNode = {
      id: crypto.randomUUID(),
      type: 'TEXT',
      position: { x: 20, y: 20 },
      data: {
        nextNodeId: null,
        content: {
          text: data.content.text,
        }
      },
    }

    setNodes((nodes: Node[]) => [...nodes, newNode]);
  };
  
  return (
    <div className="react-flow__node-default" style={{ minWidth: '200px', minHeight: '100px' }}>
      <h2>NODE DE TEXTO</h2>
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
      <div style={{ marginBottom: '8px', color: '#555', fontSize: '12px', fontWeight: 'bold' }}>Texto:</div>
      <div>
      <textarea
          value={data.content.text || ''}
          onChange={handleTextChange}
          className='node-textarea'
          // style={{ 
          //   width: '100%',
          //   marginBottom: '15px',
          //   textAlign: 'center',
          //   fontSize: '12px',
          //   border: '1px solid black',
          //   background: 'transparent',
          //   resize: 'none',         
          //   overflow: 'hidden',       
          //   minHeight: '100px',       
          //   lineHeight: '1.2',       
          //   padding: '4px',          
          //   height: 'auto',          
          //   boxSizing: 'border-box'
          // }}
          // rows={1}                  
        />
      </div>
      <Handle 
        type="source" 
        position={Position.Right} 
        style={{ width: '15px', height: '15px', background: '#f5f5f5' }}
      />
    </div>
  );
}
