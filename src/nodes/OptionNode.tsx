import { Handle, Position, type NodeProps } from '@xyflow/react';
import { OptionNode as OptionNodeType } from './types';

export function OptionNode({ data }: NodeProps<OptionNodeType>) {
  return (
    <div className="react-flow__node-default">
      <Handle type="target" position={Position.Top} />
      <div>{data.name}</div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}
