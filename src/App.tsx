import { useRef, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useUndoable from 'use-undoable';
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  useReactFlow,
  MiniMap,
  addEdge,
  type OnConnect,
  Connection,
  Edge,
  BackgroundVariant,
  applyNodeChanges,
  applyEdgeChanges,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { initialNodes, nodeTypes } from './nodes';
import { initialEdges, edgeTypes } from './edges';
import { DnDProvider, useDnD } from './components/sidebar/DnDContext';
import { Sidebar } from './components/sidebar/Sidebar';
import { AppNode, MenuNode, MenuOptionData } from './nodes/types';

const getId = () => uuidv4();

const DnDFlow = () => {
  const savedNodes = JSON.parse(localStorage.getItem('nodes') || '[]');
  const savedEdges = JSON.parse(localStorage.getItem('edges') || '[]');

  const reactFlowWrapper = useRef(null);
  const [state, setState, { undo, canUndo }] = useUndoable({
    nodes: savedNodes.length > 0 ? savedNodes : initialNodes,
    edges: savedEdges.length > 0 ? savedEdges : initialEdges
  });
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

  const onConnect: OnConnect = useCallback((params: Connection) => {
    if (hasExistingConnection(params.source, params.sourceHandle, state.edges)) {
      alert('Este nó ou opção já possui uma conexão!');
      return;
    }

    const newEdge = {
      id: getId(), // Gera um ID único para o novo edge
      source: params.source,
      target: params.target,
      sourceHandle: params.sourceHandle,
      targetHandle: params.targetHandle,
  };

    setState(
      (els) => ({
        nodes: els.nodes.map((node: AppNode) => {
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
        }),
        edges: els.edges.concat(newEdge)
      })
    );
  }, [setState, state.nodes, state.edges, hasExistingConnection]);

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
      if (type === 'MENU' || type === 'QUICK_REPLY') {
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
      } else if (type === 'IMAGE') {
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
      } else if (type === 'AI_AGENT') {
        newNode = {
          id: getId(),
          type,
          position,
          data: {
            nextNodeId: null,
            content: {
              endpoint: '',
              instruction: '',
              useFallback: false,
              fallbackMessage: null,
            }
          },
        }
      }
    
      setState(
        (els) => ({
          nodes: els.nodes.concat(newNode),
          edges: els.edges
        })
      );
    },
    [screenToFlowPosition, type, setState]
  );

  const onNodesChange = (changes: any) => {
    setState(
      (els) => ({
        nodes: applyNodeChanges(changes, els.nodes),
        edges: els.edges
      }),
      undefined,
      !changes.some((change: any) => change.type === 'position' && change.dragging)
    );
  };

  const onEdgesChange = (changes: any) => {
    setState(
      (els) => ({
        nodes: els.nodes,
        edges: applyEdgeChanges(changes, els.edges)
      })
    );
  };

  const resetNodes = () => {
    setState(
      (els) => ({
        nodes: initialNodes,
        edges: initialEdges
      })
    );
  };

  useEffect(() => {
    // Salvar o estado no local storage sempre que ele mudar
    localStorage.setItem('nodes', JSON.stringify(state.nodes));
    localStorage.setItem('edges', JSON.stringify(state.edges));
  }, [state.nodes, state.edges]); 

  console.log(state.nodes);
  return (
    <div className="dndflow dark">
      <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ width: '100%', height: '100%' }}>
        <ReactFlow
          nodes={state.nodes}
          edges={state.edges}
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
          proOptions={{ hideAttribution: true }}
          className="react-flow-dark"
          style={{ backgroundColor: '#ffffff' }}
        >
          <Controls position='top-right'/>
          <Background color="#333" variant={BackgroundVariant.Dots} gap={12} size={1} />
          <MiniMap />
          <div style={{
            position: 'fixed',
            right: 50,
            top: 10,
            zIndex: 4,
          }}>
            <button
              onClick={undo}
              disabled={!canUndo}
              className="toolbar-button"
              style={{
                background: '#4a4a4a',
                color: 'white',
                width: 'auto',
                padding: '2px 8px', 
              }}
            >
              Desfazer
            </button>
            <button
              onClick={resetNodes}
              className="toolbar-button"
              style={{
                background: '#4a4a4a',
                color: 'white',
                width: 'auto',
                padding: '2px 8px', 
              }}
            >
              Resetar fluxo
            </button>
          </div>
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
