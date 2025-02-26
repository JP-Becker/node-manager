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
      <Handle 
        type="target" 
        position={Position.Top} 
        style={{ width: '15px', height: '15px', background: '#f5f5f5' }}
      />
      <div>
        {data.name}
      </div>
      <Handle 
        type="source" 
        position={Position.Bottom} 
        id="a" 
        style={{ width: '15px', height: '15px', background: '#f5f5f5' }}
      />
    </div>
  );
}