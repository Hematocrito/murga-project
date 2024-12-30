import { useQuery } from '@apollo/client';
import { OBTENER_CLIENTES_USUARIO } from '../graphql/queries/clients';
import { Cliente } from '../types/Cliente';

export const useClients = () => {
  const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO);
  
  return {
    clients: data?.obtenerClientesVendedor as Cliente[] || [],
    loading,
    error
  };
};