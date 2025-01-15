import { BaseEdge, EdgeProps, getBezierPath, useReactFlow } from '@xyflow/react';

export function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) {
  const { setEdges, setNodes } = useReactFlow();

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onEdgeDelete = () => {
    // Remove a edge
    setEdges((edges) => edges.filter((edge) => edge.id !== id));

    // Atualiza o nextNodeId do node de origem da parada
    setNodes((nodes) => {
      return nodes.map((node) => {
        if (node.id === sourceX) {
          if (node.type === 'MENU') {
            return {
              ...node,
              data: {
                ...node.data,
                options: node.data.options.map((option) => {
                  if (option.id === id) {
                    return { ...option, nextNodeId: null };
                  }
                  return option;
                }),
              },
            };
          }
          return {
            ...node,
            data: {
              ...node.data,
              nextNodeId: null,
            },
          };
        }
        return node;
      });
    });
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <foreignObject
        width={20}
        height={20}
        x={labelX - 10}
        y={labelY - 10}
        className="edgebutton-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <div
          style={{
            background: '#fff',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // cursor: 'pointer',
            border: '1px solid #999',
          }}
          onClick={(event) => {
            event.stopPropagation();
            onEdgeDelete();
          }}
        >
          X
        </div>
      </foreignObject>
    </>
  );
}
