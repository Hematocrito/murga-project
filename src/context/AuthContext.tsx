import React, { createContext, useContext, useState } from 'react';
import { gql, useMutation } from "@apollo/client";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AUTENTICAR_USUARIO = gql`
    mutation AutenticarUsuario($input: AutenticarInput) {
        autenticarUsuario(input: $input) {
            token
        }
    }
`;

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //Mutation para crear nuevos usuarios en apollo
  const [ autenticarUsuario ] = useMutation(AUTENTICAR_USUARIO);

  const login = async (username: string, password: string) => {
    // Simulated authentication - In production, replace with real API call

    try {
      const { data } = await autenticarUsuario({
        variables: {
            input:{
                email: username,
                password                            
            }
        }
      });
      console.log(data);

      //Guardar el token en local storage
      const { token } = data.autenticarUsuario;
      localStorage.setItem('token', token);

      setIsAuthenticated(true);
      return true;
      
    } catch (error) {
      console.log(error);
      return false;
    }


    /*
    if (username === 'admin' && password === 'admin') {
      setIsAuthenticated(true);
      return true;
    }
    */
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};