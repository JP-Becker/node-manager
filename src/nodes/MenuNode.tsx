import { Handle, Position, type NodeProps } from '@xyflow/react';
import { MenuNode as MenuNodeType } from './types';
import { LabeledHandle } from '../components/LabeledHandle';

export function MenuNode({ data }: NodeProps<MenuNodeType>) {
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
        {data.text}
      </div>

      <div style={{ 
        marginBottom: '8px',
        color: '#555',
        fontSize: '12px',
        borderBottom: '1px solid #eee',
        paddingBottom: '4px',
        textAlign: 'left',
        fontWeight: 'bold'
      }}>
        Opções:
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
