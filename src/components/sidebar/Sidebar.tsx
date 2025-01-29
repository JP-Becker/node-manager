import React from 'react';

import { useDnD } from './DnDContext';
import { AvailableNodeTypes } from '../../nodes';
import { useReactFlow } from '@xyflow/react';

export const Sidebar = () => {
  const [_, setType] = useDnD();
  const { getNodes, getEdges } = useReactFlow();

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
              options: node.data.options,
            },
          };

          case 'QUICK_REPLY':
          return {
            ...baseNode,
            nextNodeId: null,
            content: {
              text: node.data.text,
              options: node.data.options,
            },
          };

        case 'WEBLINK':
          return {
            ...baseNode,
            nextNodeId: node.data.nextNodeId,
            content: {
              url: node.data.content.url,
              title: node.data.content.title,
              text: node.data.content.text,
            },
          };

        case 'IMAGE':
          return {
            ...baseNode,
            nextNodeId: node.data.nextNodeId,
            content: {
              url: node.data.content.url,
              title: node.data.content.title,
              text: node.data.content.text,
            },
          };

        case 'TEXT':
          return {
            ...baseNode,
            nextNodeId: node.data.nextNodeId,
            content: {
              text: node.data.content.text,
            },
          };

          case 'GO_TO_BLOCK':
          return {
            ...baseNode,
            nextNodeId: node.data.nextNodeId,
            content: {
              id: node.data.content.id,
            },
          };

          case 'AI_AGENT':
          return {
            ...baseNode,
            nextNodeId: node.data.nextNodeId,
            content: {
              endpoint: node.data.content.endpoint,
              instruction: node.data.content.instruction,
              useFallback: node.data.content.useFallback,
              fallbackMessage: node.data.content.fallbackMessage,
            },
          };

        default:
          return baseNode;
      }
    };

    const sortedNodes = nodes.sort((a, b) => {
      if (a.type === 'GO_TO_BLOCK' && b.type !== 'GO_TO_BLOCK') return 1;
      if (a.type !== 'GO_TO_BLOCK' && b.type === 'GO_TO_BLOCK') return -1;
      return 0;
    });

    const formattedNodes = sortedNodes.map(formatNode);
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

  const handleExportReactFlowFormat = () => {
    const nodes = getNodes();
    const edges = getEdges();

    const jsonData = JSON.stringify({ nodes, edges }, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'nodes-export.json';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }


  return (
    <aside style={{ position: 'fixed', top: '0', left: '0', width: '200px', height: '100vh', backgroundColor: '#f0f0f0' }}>
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
      <div className="dndnode quick-reply" onDragStart={(event) => onDragStart(event, 'QUICK_REPLY')} draggable>
        Quick Reply Node
      </div>
      <div className="dndnode ai-agent" onDragStart={(event) => onDragStart(event, 'AI_AGENT')} draggable>
        AI Agent Node
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
          fontSize: '12px',
        }}
      >
        Exportar Nodes no formato blip
      </button>

      <button
        onClick={handleExportReactFlowFormat}
        style={{
          width: '100%',
          padding: '8px',
          marginTop: '10px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px',
        }}
      >
        Exportar Nodes e Edges no formato React Flow
      </button>
    </aside>
  );
};

