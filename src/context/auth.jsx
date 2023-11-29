import React, { createContext, useContext, useState } from 'react';

const MeuContexto = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <MeuContexto.Provider value={{ user, setUser }}>
      {children}
    </MeuContexto.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(MeuContexto);

  if (!context) {
    throw new Error('useMeuContexto deve ser usado dentro de um MeuContextoProvider');
  }

  console.log('CONTEXT', context)

  return [context.user, context.setUser];
};
