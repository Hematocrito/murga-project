import { useQuery } from '@apollo/client';
import { OBTENER_CLIENTES_USUARIO } from '../graphql/queries/clients';
//import { Cliente } from '../types/Cliente';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
export function useClients() {
  const { token } = useAuth(); // Obtener token del contexto de autenticación

  const { data, loading, error, refetch } = useQuery(OBTENER_CLIENTES_USUARIO, {
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    },
    skip: !token, // No ejecutar la query si no hay token
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    if (token) {
      refetch(); // Refetch cuando el token está disponible
    }
  }, [token, refetch]);

  return {
    clients: data?.obtenerClientesVendedor || [],
    loading: loading || !token,
    error,
    refetch
  };
}