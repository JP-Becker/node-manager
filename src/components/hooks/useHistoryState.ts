import { useState, useCallback, useEffect } from 'react';
import { Node, Edge, applyEdgeChanges, applyNodeChanges } from '@xyflow/react';

interface HistoryState {
  nodes: Node[];
  edges: Edge[];
}

export function useHistoryState(initialNodes: Node[], initialEdges: Edge[]) {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [history, setHistory] = useState<HistoryState[]>([{ nodes: initialNodes, edges: initialEdges }]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onNodesChange = useCallback((changes: any) => {
    setNodes((nds: Node[]) => {
      const updatedNodes = applyNodeChanges(changes, nds);
      return updatedNodes;
    });
  }, [setNodes]);

  const onEdgesChange = useCallback((changes: any) => {
    setEdges((eds: Edge[]) => {
      const updatedEdges = applyEdgeChanges(changes, eds);
      return updatedEdges;
    });
  }, [setEdges]);

  const updateHistory = useCallback((newNodes: Node[], newEdges: Edge[]) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, currentIndex + 1);
      return [...newHistory, { nodes: newNodes, edges: newEdges }];
    });
    setCurrentIndex(prev => prev + 1);
  }, [currentIndex]);

  const undo = useCallback(() => {
    if (currentIndex > 0  && history[currentIndex - 1]) {
      const previousState = history[currentIndex - 1];
      setNodes([...previousState.nodes]);
      setEdges([...previousState.edges]);
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex, history]);

  // Listener para Ctrl+Z
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'z') {
        event.preventDefault();
        undo();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [undo]);

  const setNodesWithHistory = useCallback((updater: any) => {
    setNodes(current => {
      const newNodes = typeof updater === 'function' ? updater(current) : updater;
      updateHistory(newNodes, edges);
      return newNodes;
    });
  }, [edges, updateHistory, onEdgesChange]);

  const setEdgesWithHistory = useCallback((updater: any) => {
    setEdges(current => {
      const newEdges = typeof updater === 'function' ? updater(current) : updater;
      updateHistory(nodes, newEdges);
      return newEdges;
    });
  }, [nodes, updateHistory, onNodesChange]);

  

  return {
    nodes,
    edges,
    setNodes: setNodesWithHistory,
    setEdges: setEdgesWithHistory,
    onNodesChange: onNodesChange,
    onEdgesChange: onEdgesChange,
    undo,
  };
}