import React from 'react';

import { useDnD } from './DnDContext';
import { AvailableNodeTypes } from '../../nodes';
import { useReactFlow } from '@xyflow/react';



export const Sidebar = () => {
  const [_, setType] = useDnD();
  const { getNodes } = useReactFlow();

  
  
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: AvailableNodeTypes) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleExport = () => {
    const nodes = getNodes();
    
    const formatNode = (node) => {
      const baseNode = {
        id: node.id,
        type: node.type,
      };
  
      switch (node.type) {
        case 'MENU':
          return {
            ...baseNode,
            nextNodeId: null,
            content: {
              text: node.data.text,
              options: node.data.options
            }
          };
  
        case 'WEBLINK':
          return {
            ...baseNode,
            nextNodeId: node.data.nextNodeId,
            content: {
              url: node.data.content.url,
              title: node.data.content.title,
              text: node.data.content.text
            }
          };

          case 'IMAGE':
          return {
            ...baseNode,
            nextNodeId: node.data.nextNodeId,
            content: {
              url: node.data.content.url,
              title: node.data.content.title,
              text: node.data.content.text
            }
          };
  
        case 'TEXT':
          return {
            ...baseNode,
            nextNodeId: node.data.nextNodeId,
            content: {
              text: node.data.content.text
            }
          };
  
        default:
          return baseNode;
      }
    };
  
    const formattedNodes = nodes.map(formatNode);
    const jsonData = JSON.stringify(formattedNodes, null, 2);
    
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'nodes-export.json';
    
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <aside>
      <div className="description">Clique e arraste o nó desejado.</div>
      <div className="dndnode menu" onDragStart={(event) => onDragStart(event, 'MENU')} draggable>
        Menu Node
      </div>
      <div className="dndnode text" onDragStart={(event) => onDragStart(event, 'TEXT')} draggable>
        Text Node
      </div>
      <div className="dndnode option" onDragStart={(event) => onDragStart(event, 'WEBLINK')} draggable>
        Web Link Node
      </div>
      <div className="dndnode option" onDragStart={(event) => onDragStart(event, 'IMAGE')} draggable>
        Image Node
      </div>

      <button 
        onClick={handleExport}
        style={{
          width: '100%',
          padding: '8px',
          marginTop: '00%',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px'
        }}
      >
        Exportar Nodes
      </button>
    </aside>
  );
};