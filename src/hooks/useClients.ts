import { useQuery } from '@apollo/client';
import { OBTENER_CLIENTES_USUARIO } from '../graphql/queries/clients';
import { Cliente } from '../types/Cliente';

export const useClients = () => {
  const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO, {
    fetchPolicy: 'network-only'
  });

  const clients: Cliente[] = data?.obtenerClientesVendedor || [];
  const totalPages = Math.ceil(clients.length / 10);

  return {
    clients,
    loading,
    error,
    page: 1,
    totalPages,
    handlePageChange: () => {} // Pagination will be implemented later if needed
  };
};