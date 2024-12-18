import React from 'react';

import { useDnD } from './DnDContext';
import { AvailableNodeTypes } from '../../nodes';



export const Sidebar = () => {
  const [_, setType] = useDnD();
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: AvailableNodeTypes) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
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
    </aside>
  );
};