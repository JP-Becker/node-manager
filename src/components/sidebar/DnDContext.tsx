import { createContext, useContext, useState } from 'react';
import { AvailableNodeTypes } from '../../nodes';
 
const DnDContext = createContext<[AvailableNodeTypes | null, (type: AvailableNodeTypes | null) => void]>([null, (_) => {}]);
 
export const DnDProvider = ({ children }: { children: React.ReactNode }) => {
  const [type, setType] = useState<AvailableNodeTypes | null>(null);
 
  return (
    <DnDContext.Provider value={[type, setType]}>
      {children}
    </DnDContext.Provider>
  );
}
 
export default DnDContext;
 
export const useDnD = () => {
  return useContext(DnDContext);
}