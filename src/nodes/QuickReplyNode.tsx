import { Handle, Position, type NodeProps, useReactFlow, Node, NodeToolbar, NodeToolbarProps } from '@xyflow/react';
import { QuickReplyNode as QuickReplyNodeType } from './types';
import { LabeledHandle } from '../components/LabeledHandle';

export function QuickReplyNode({ data, id}: NodeProps<QuickReplyNodeType> & NodeToolbarProps) {
  const { setNodes, deleteElements } = useReactFlow();

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value;
    setNodes((nodes: Node[]) => 
      nodes.map((node: Node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              text: newText
            }
          };
        }
        return node;
      })
    );
  };

  const handleAddOption = () => {
    setNodes((nodes: Node[]) => 
      nodes.map((node: Node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              options: [
                ...node.data.options,
                {
                  id: crypto.randomUUID(),
                  type: 'OPTION',
                  nextNodeId: null,
                  content: {
                    name: 'Nova Opção'
                  }
                }
              ]
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
    <div className="react-flow__node-default" style={{ 
      minWidth: '250px',
      padding: '15px',
      borderRadius: '8px'
    }}>
      <NodeToolbar isVisible={data.toolbarVisible} position={data.toolbarPosition}>
        <button onClick={handleDelete}>delete</button>
        <button>copy</button>
        <button>expand</button>
      </NodeToolbar>

      <Handle type="target" position={Position.Left} />
      
      <div style={{ 
        marginBottom: '4px',
        color: '#555',
        fontSize: '12px',
        textAlign: 'left',
        fontWeight: 'bold'
      }}>
        Texto:
      </div>
      
      <div style={{ 
        marginBottom: '15px', 
        textAlign: 'center',
        fontSize: '12px',
      }}>
        <input
        value={data.text}
        onChange={handleTextChange}
        style={{ 
          width: '100%',
          marginBottom: '15px',
          textAlign: 'center',
          fontSize: '12px',
          border: '1px solid black',
          background: 'transparent'
        }}
      />
      </div>

      <div style={{ 
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '8px',
        color: '#555',
        fontSize: '12px',
        borderBottom: '1px solid #eee',
        textAlign: 'left',
        fontWeight: 'bold'
      }}>
        Opções:
        <div>
        <button 
          onClick={handleAddOption}
          style={{
            padding: '2px 8px',
            fontSize: '12px',
            background: 'black',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          +
        </button>
        </div>
        
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {data.options.map((option) => (
          <LabeledHandle
            key={option.id}
            id={option.id}
            label={option.content.name}
            type="source"
            position={Position.Right}
          />
        ))}
      </div>
    </div>
  );
}