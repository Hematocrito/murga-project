import React, { createContext, useContext, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { OBTENER_USUARIO } from '../graphql/queries/user';

interface User {
  id: string;
  email: string;
  name: string;
  rol: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null; 
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isUser: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token');
  });

  const isAuthenticated = !!user && !!token;
  const isAdmin = user?.rol === 'admin';
  const isUser = user?.rol === 'user';
  const client = useApolloClient();

  const login = async (newToken: string): Promise<User> => {
    /*
    const mockUser = {
      id: '1',
      email,
      name: email.split('@')[0],
      rol: 'ABOGADO',
    };
    setUser(mockUser);
    setToken(newToken);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(mockUser));*/

    try {
      // Set the token in localStorage
      localStorage.setItem('token', newToken);
      setToken(newToken);

      // Fetch user information
      const { data } = await client.query({
        query: OBTENER_USUARIO,
      });

      const { nombre, apellido, email: userEmail, rol } = data.obtenerUsuario;
      const loggedUser: User = {
        id: '1',
        email: userEmail,
        name: `${nombre} ${apellido}`,
        rol,
      };

      setUser(loggedUser);
      localStorage.setItem('user', JSON.stringify(user));
      return loggedUser;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw new Error('Failed to fetch user data');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated, isAdmin, isUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}