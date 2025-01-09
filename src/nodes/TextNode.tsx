import { Handle, Position, useReactFlow, type NodeProps, Node } from '@xyflow/react';
import { TextNode as TextNodeType } from './types';

export function TextNode({ data, id }: NodeProps<TextNodeType>) {
  const { setNodes } = useReactFlow();

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
  
  return (
    <div className="react-flow__node-default" style={{ minWidth: '200px', minHeight: '100px' }}>
      <Handle type="target" position={Position.Top} />
      <div style={{ marginBottom: '8px', color: '#555', fontSize: '12px', fontWeight: 'bold' }}>Texto:</div>
      <div>
      <textarea
          value={data.content.text}
          onChange={handleTextChange}
          style={{ 
            width: '100%',
            marginBottom: '15px',
            textAlign: 'center',
            fontSize: '12px',
            border: 'none',
            background: 'transparent',
            resize: 'none',         
            overflow: 'hidden',       
            minHeight: '100px',       
            lineHeight: '1.2',       
            padding: '4px',          
            height: 'auto',          
            boxSizing: 'border-box'
          }}
          rows={1}                  
        />
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
