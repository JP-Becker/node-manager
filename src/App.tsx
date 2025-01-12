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
  Edge,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { initialNodes, nodeTypes } from './nodes';
import { initialEdges, edgeTypes } from './edges';
import { DnDProvider, useDnD } from './components/sidebar/DnDContext';
import { Sidebar } from './components/sidebar/Sidebar';
import { AppNode, MenuNode, MenuOptionData } from './nodes/types';
import { CustomEdge } from './edges/CustomEdge';

const getId = () => uuidv4();

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();

  const hasExistingConnection = useCallback((sourceId: string, sourceHandle: string | null, edges: Edge[]) => {
    return edges.some(edge => {
      if (sourceHandle) {
        // Para nós MENU, verifica se já existe conexão para aquela opção específica
        return edge.source === sourceId && edge.sourceHandle === sourceHandle;
      }
      // Para outros nós, verifica se já existe qualquer conexão saindo do nó
      return edge.source === sourceId;
    });
  }, []);

  const onEdgeDelete = useCallback((edgeId: string) => {
    const edgeToDelete: Edge | undefined = edges.find(edge => edge.id === edgeId);

    // Atualiza o nextNodeId do nó fonte
    setNodes((nds: AppNode[]) => {
      return nds.map((node) => {
        if (node.id === edgeToDelete.source) {
          if (node.type === 'MENU') {
            const menuNode = node as MenuNode;
            return {
              ...menuNode,
              data: {
                ...menuNode.data,
                options: menuNode.data.options.map((option: MenuOptionData) => {
                  if (option.id === edgeToDelete.sourceHandle) {
                    return { ...option, nextNodeId: null };
                  }
                  return option;
                })
              }
            } as AppNode;
          }
          
          return {
            ...node,
            data: {
              ...node.data,
              nextNodeId: null
            }
          } as AppNode;
        }
        return node;
      });
    });
  }, [edges, setEdges, setNodes]);

  const onConnect: OnConnect = useCallback((params: Connection) => {
    if (hasExistingConnection(params.source, params.sourceHandle, edges)) {
      alert('Este nó ou opção já possui uma conexão!');
      return;
    }

    setEdges((eds) => addEdge(params, eds));
    
    setNodes((nds: AppNode[]) => {
      return nds.map((node) => {
        if (node.id === params.source && node.type === 'MENU') {
          const menuNode = node as MenuNode;
          return {
            ...menuNode,
            data: {
              ...menuNode.data,
              options: menuNode.data.options.map((option: MenuOptionData) => {
                if (option.id === params.sourceHandle) {
                  return { ...option, nextNodeId: params.target };
                }
                return option;
              })
            }
          } as AppNode;
        }
        
        if (node.id === params.source) {
          return {
            ...node,
            data: {
              ...node.data,
              nextNodeId: params.target
            }
          } as AppNode;
        }
        return node;
      });
    });
  }, [setEdges, setNodes, edges, hasExistingConnection]);

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
      
    } else if (type === 'TEXT') {
      newNode = {
        id: getId(),
        type,
        position,
        data: {
          nextNodeId: null,
          content: {
            text: '',
          }
        },
      }
    } else if (type === 'WEBLINK') {
      newNode = {
        id: getId(),
        type,
        position,
        data: {
          nextNodeId: null,
          content: {
            url: '',
            title: '',
            text: '',
          }
        },
      }
    }
  
    setNodes((nds) => nds.concat(newNode));
   
  },
    [screenToFlowPosition, type, setNodes]
  );
  console.log(edges);
  return (
    <div className="dndflow">
      <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ width: '100%', height: '100%' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={{ 
            type: 'custom'
          }}
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
