import { Handle, Position, type NodeProps } from '@xyflow/react';
import { MenuNode as MenuNodeType } from './types';
import { LabeledHandle } from '../components/LabeledHandle';
import { useState } from 'react';

export function MenuNode({ data }: NodeProps<MenuNodeType>) {
  const [text, setText] = useState(data.text); // Adicione esta linha

  const handleTextChange = (event: React.FormEvent<HTMLDivElement>) => {
    setText(event.currentTarget.textContent || ''); // Atualize o estado com o texto editado
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
       <div 
          contentEditable 
          suppressContentEditableWarning 
          style={{ border: '1px solid #ccc', padding: '5px', borderRadius: '4px' }}
          onInput={handleTextChange}
        >
          {text}
        </div>
        
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
