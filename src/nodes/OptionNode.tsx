import { Handle, Position, useReactFlow, type NodeProps, Node } from '@xyflow/react';
import { OptionNode as OptionNodeType } from './types';

export function OptionNode({ data, id }: NodeProps<OptionNodeType>) {
  const { setNodes } = useReactFlow();

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value;
    setNodes((nodes) => 
      nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              content: {
                
                name: newText
              }
            }
          };
        }
        return node;
      })
    );
  };

  return (
    <div className="react-flow__node-default">
      <Handle type="target" position={Position.Top} />
      <div>
        <input
          value={data.name}
          onChange={handleTextChange}
          style={{ 
            width: '100%',
            marginBottom: '15px',
            textAlign: 'center',
            fontSize: '12px',
            border: 'none',
            background: 'transparent'
          }}
        />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}