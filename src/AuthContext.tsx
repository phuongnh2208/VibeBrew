import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Role } from './types';
import { MOCK_USERS } from './mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  switchNextUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(MOCK_USERS[1]); // Default to Branch Manager for demo

  const login = (email: string) => {
    const foundUser = MOCK_USERS.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const switchNextUser = () => {
    const currentIndex = MOCK_USERS.findIndex(u => u.id === user?.id);
    const nextIndex = (currentIndex + 1) % MOCK_USERS.length;
    setUser(MOCK_USERS[nextIndex]);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, switchNextUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
