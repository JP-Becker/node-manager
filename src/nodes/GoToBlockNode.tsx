import { Handle, Position, useReactFlow, type NodeProps, Node, NodeToolbar } from '@xyflow/react';
import { GoToBlockNode as GoToBlockNodeType } from './types';

export function GoToBlockNode({ data, id }: NodeProps<GoToBlockNodeType>) {
  const { deleteElements } = useReactFlow();

  const handleDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };

  const handleWichBlockToGo = () => {
    switch (data.id) {
      case '12fadfb8-3f6e-4e8c-86cc-32afa4294d40':
        return 'HORARIO DE ATENDIMENTO (VALIDAÇÃO DE HORARIO ANTES DO CADASTRO)';
      case 'dca0807f-e431-45f6-b25f-d39fd0f71a01':
        return 'DIRECTOR';
      case 'daf6397a-f659-4586-a6f6-306fe2984a19':
        return 'CADASTRO';
      case '0fda2fc3-b906-404a-bb98-684cad5275dd':
        return 'HORARIO DE ATENDIMENTO (VALIDAÇÃO DE HORARIO DEPOIS DO CADASTRO)';
      case 'ca67b49e-0d75-49e8-9ce3-773b6df2059c':
        return 'ATENDIMENTO HUMANO';
      case '40d3f64f-07b9-4a22-ac21-37848a0ad2e4':
        return 'PESQUISA COM NOTA';
      case '5efb9be7-0b15-4fd0-95f7-6c87605b8fe3':
        return 'PESQUISA SEM NOTA';
      case '7ce2f72d-e69e-42a8-b040-a402e83f7304':
        return 'ORIGEM';
      default:
        return null;
    }
  };

  return (
    <div className="react-flow__node-default" style={{ minWidth: '200px', minHeight: '100px' }}>
      <NodeToolbar isVisible={data.toolbarVisible} position={data.toolbarPosition}>
        <button onClick={handleDelete}>delete</button>
        <button>copy</button>
        <button>expand</button>
      </NodeToolbar>
      <Handle type="target" position={Position.Left} />
      <div style={{ marginBottom: '8px', color: '#555', fontSize: '12px', fontWeight: 'bold' }}>Texto:</div>
      <div>{handleWichBlockToGo()}</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
