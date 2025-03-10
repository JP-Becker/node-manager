import { Handle, Position, useReactFlow, Node } from '@xyflow/react';
import { MenuNode as MenuNodeType } from '../nodes/types';

interface LabeledHandleProps {
  id: string;
  label: string;
  type: 'source' | 'target';
  position: Position;
}

export function LabeledHandle({ id, label, type, position }: LabeledHandleProps) {
  const { setNodes } = useReactFlow();

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value;
    setNodes((nodes) => 
      nodes.map((node) => {
        // Procura o nó pai (MenuNode) que contém a opção
        const menuNode = node as Node<MenuNodeType>;
        if (menuNode.type === 'MENU'|| menuNode.type === 'QUICK_REPLY' && menuNode.data.options?.some((option: { id: string })   => option.id === id)) {
          return {
            ...menuNode,
            data: {
              ...menuNode.data,
              options: menuNode.data.options.map((option: { id: string }) => 
                option.id === id 
                  ? { ...option, content: { ...option.content, name: newText } }
                  : option
              )
            }
          };
        }
        return node;
      })
    );
  };

  const handleDelete = () => {
    setNodes((nodes) => 
      nodes.map((node) => {
        const menuNode = node as Node<MenuNodeType>;
        if (menuNode.type === 'MENU' || menuNode.type === 'QUICK_REPLY' && menuNode.data.options?.some((option: { id: string }) => option.id === id)) {
          return {
            ...menuNode,
            data: {
              ...menuNode.data,
              options: menuNode.data.options.filter((option: { id: string }) => option.id !== id)
            }
          };
        }
        return node;
      })
    );
  };
  
  return (
    <div style={{ 
      position: 'relative', 
      marginBottom: '8px',
      display: 'flex',
      justifyContent: position === Position.Right ? 'flex-end' : 'flex-start',
      alignItems: 'center'
    }}>
      <button 
        onClick={handleDelete}
        className="toolbar-button toolbar-button-delete"
        style={{
          width: 'auto',
          padding: '2px 8px',
          fontSize: '12px',
          marginRight: '4px'
        }}
      >
        x
      </button>
      <input
        value={label}
        onChange={handleTextChange}
        maxLength={72}
        style={{ 
          width: '100%',
          marginRight: '8px',
          textAlign: 'center',
          fontSize: '12px',
          border: '1px solid black',
          background: 'transparent'
        }}
      />
      <Handle
        type={type}
        position={position}
        id={id}
        style={{ width: '15px', height: '15px', background: '#f5f5f5' }}
      />
    </div>
  );
} 