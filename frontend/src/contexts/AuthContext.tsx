import { createContext, useState, type ReactNode } from 'react';
import type { UserDto } from '../types';

interface AuthContextType {
  user: UserDto | null;
  token: string | null;
  login: (token: string, user: UserDto) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getInitialToken(): string | null {
  return localStorage.getItem('token');
}

function getInitialUser(): UserDto | null {
  const saved = localStorage.getItem('user');
  if (saved) {
    return JSON.parse(saved) as UserDto;
  }
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserDto | null>(getInitialUser);
  const [token, setToken] = useState<string | null>(getInitialToken);

  const login = (newToken: string, newUser: UserDto) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
