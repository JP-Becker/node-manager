import React, { createContext, useContext, useState } from 'react';

type DnDContextType = [string | null, (nodeType: string) => void];

export const DnDContext = createContext<DnDContextType | undefined>(undefined);

export function DnDProvider({ children }: { children: React.ReactNode }) {
  const [type, setType] = useState<string | null>(null);
  
  return (
    <DnDContext.Provider value={[type, setType]}>
      {children}
    </DnDContext.Provider>
  );
}

export function useDnD() {
  const context = useContext(DnDContext);
  if (!context) {
    throw new Error('useDnD deve ser usado dentro de um DnDProvider');
  }
  return context;
} 