import { useRef, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  useReactFlow,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type OnConnect,
  Connection,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { initialNodes, nodeTypes } from './nodes';
import { initialEdges, edgeTypes } from './edges';
import { DnDProvider, useDnD } from './components/sidebar/DnDContext';
import { Sidebar } from './components/sidebar/Sidebar';
import { AppNode } from './nodes/types';

const getId = () => uuidv4();

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();

  const onConnect: OnConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), []);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (!type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      let newNode: AppNode;
      if (type === 'MENU') {
        newNode = {
          id: getId(),
        type,
        position,
        data: {
          text: '',
          options: [
            {
              id: getId(),
              type: 'OPTION',
              nextNodeId: null,
              content: {
                name: '',
              },
            },
          ],
        },
      }

      setNodes((nds) => nds.concat(newNode));
      console.log(newNode);
    }},
    [screenToFlowPosition, type, setNodes]
  );

  return (
    <div className="dndflow">
      <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ width: '100%', height: '100%' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
          style={{ backgroundColor: '#F7F9FB' }}
        >
          <Controls />
          <Background />
          <MiniMap />
        </ReactFlow>
      </div>
      <Sidebar />
    </div>
  );
};

export default function App() {
  return (
    <ReactFlowProvider>
      <DnDProvider>
        <DnDFlow />
      </DnDProvider>
    </ReactFlowProvider>
  );
}
