import React, { useContext, useState } from 'react';
import { DnDContext } from './DnDContext';

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