import { Handle, Position, type NodeProps, Node, NodeToolbar } from '@xyflow/react';
import { GoToBlockNode as GoToBlockNodeType } from './types';

export function GoToBlockNode({ data }: NodeProps<GoToBlockNodeType>) {


  const handleWichBlockToGo = () => {
    switch (data.content.id) {
      case 'd506f400-22cf-434d-b31c-2c7b9a988fa7':
        return 'HORARIO DE ATENDIMENTO (VALIDAÇÃO DE HORARIO ANTES DO CADASTRO)';
      case '329d9c58-bbb8-41d3-9fa1-0a73b736b393':
        return 'DIRECTOR';
      case '40e3178d-e1be-4f82-b296-73378f7cd53e':
        return 'CADASTRO';
      case 'd506f400-22cf-434d-b31c-2c7b9a988fa7':
        return 'HORARIO DE ATENDIMENTO (VALIDAÇÃO DE HORARIO DEPOIS DO CADASTRO)';
      case '252c9326-cffd-430b-b53e-e5cfad89aab8':
        return 'ATENDIMENTO HUMANO';
      case '23bcf87c-2b45-4798-8ea8-5ba095b1f2eb':
        return 'PESQUISA COM NOTA';
      case 'fc452091-218e-4e7f-8344-39c249d470f9':
        return 'PESQUISA SEM NOTA';
      case 'e118b07c-10cb-4404-94d4-834f57bc4dde':
        return 'ORIGEM';
      default:
        return null;
    }
  };

  return (
    <div className="react-flow__node-default" style={{ minWidth: '200px', minHeight: '100px' }} >
      <h2>GO TO BLOCK</h2>
      <Handle 
        type="target" 
        position={Position.Left} 
        style={{ width: '15px', height: '15px' }}
      />
      <div style={{ marginBottom: '8px', color: '#555', fontSize: '12px', fontWeight: 'bold' }}>IR PARA O BLOCO DE:</div>
      <div><p>{handleWichBlockToGo()}</p></div>
      {/* <Handle type="source" position={Position.Right} /> */}
    </div>
  );
}
