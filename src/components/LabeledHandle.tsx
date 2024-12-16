import { Handle, Position } from '@xyflow/react';

interface LabeledHandleProps {
  id: string;
  label: string;
  type: 'source' | 'target';
  position: Position;
}

export function LabeledHandle({ id, label, type, position }: LabeledHandleProps) {
  return (
    <div style={{ 
      position: 'relative', 
      marginBottom: '8px',
      display: 'flex',
      justifyContent: position === Position.Right ? 'flex-end' : 'flex-start',
      alignItems: 'center'
    }}>
      <span style={{ 
        fontSize: '12px',
        padding: '4px 8px',
      }}>
        {label}
      </span>
      <Handle
        type={type}
        position={position}
        id={id}
      />
    </div>
  );
} 