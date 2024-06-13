// src/context/AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {User} from '../components/Form'

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}



const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = (user: User) => {
    setUser(user);
    // Redirecionar para o dashboard após login
    navigate('/Dashboard');
  };

  const logout = () => {
    setUser(null);
    // Redirecionar para a página de login após logout
    navigate('/Login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth precisa ser usado por AuthProvider');
  }
  return context;
};
