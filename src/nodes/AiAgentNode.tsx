import { Handle, Position, type NodeProps, useReactFlow, NodeToolbar } from '@xyflow/react';
import { AiAgentNode as AiAgentNodeType } from './types';
import './index.css';

export function AiAgentNode({ data, id }: NodeProps<AiAgentNodeType>) {
  const { setNodes, deleteElements } = useReactFlow();

  const handleChange = (field: 'endpoint' | 'instruction') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          const typedNode = node as AiAgentNodeType;
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
      <h2>AI AGENT</h2>
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

      <Handle type="target" position={Position.Left} />

      <div style={{ marginBottom: '4px', color: '#555', fontSize: '12px', fontWeight: 'bold' }}>Endpoint:</div>
      <input
        value={data.content.endpoint}
        onChange={handleChange('endpoint')}
        style={{
          width: '100%',
          marginBottom: '8px',
          textAlign: 'center',
          border: '1px solid black',
          background: 'transparent'
        }}
      />

      <div style={{ marginBottom: '4px', color: '#555', fontSize: '12px', fontWeight: 'bold' }}>Instrução:</div>
      <input
        value={data.content.instruction}
        onChange={handleChange('instruction')}
        style={{
          width: '100%',
          marginBottom: '8px',
          textAlign: 'center',
          border: '1px solid black',
          background: 'transparent'
        }}
      />
      <Handle type="source" position={Position.Right} style={{ width: '15px', height: '15px' }}/>
    </div>
  );
}
