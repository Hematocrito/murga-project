import { useQuery } from '@apollo/client';
import { OBTENER_CLIENTE } from '../graphql/queries/clients';

interface ClientDetails {
  nombre: string;
  apellido: string;
  empresa: string;
  email: string;
  telefono: string;
  avatar: string;
  dni: string;
  estado: string;
  notas: string;
}

export const useClientDetails = (id: string) => {
  const { data, loading, error } = useQuery(OBTENER_CLIENTE, {
    variables: { id },
    fetchPolicy: 'cache-and-network'
  });

  return {
    client: data?.obtenerCliente as ClientDetails | null,
    loading,
    error
  };
};