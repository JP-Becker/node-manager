import { Handle, Position, type NodeProps, useReactFlow, Node } from '@xyflow/react';
import { MenuNode as MenuNodeType } from './types';
import { LabeledHandle } from '../components/LabeledHandle';

export function MenuNode({ data, id}: NodeProps<MenuNodeType>) {
  const { setNodes } = useReactFlow();

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
    data.options.push({
      id: crypto.randomUUID(),
      type: 'OPTION',
      nextNodeId: null,
      content: {
        name: 'Nova Opção'
      }
    });
  };

  return (
    <div className="react-flow__node-default" style={{ 
      minWidth: '250px',
      padding: '15px',
      borderRadius: '8px'
    }}>
      <Handle type="target" position={Position.Top} />
      
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
