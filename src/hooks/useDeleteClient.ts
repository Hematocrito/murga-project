import { useMutation } from '@apollo/client';
import { ELIMINAR_CLIENTE } from '../graphql/mutations/clients';
import { OBTENER_CLIENTES_USUARIO } from '../graphql/queries/clients';
import { OBTENER_CLIENTES_X_USUARIO } from '../graphql/queries/admin';

export const useDeleteClient = () => {
  const [deleteClient, { loading, error }] = useMutation(ELIMINAR_CLIENTE, {
    refetchQueries: [
      { query: OBTENER_CLIENTES_USUARIO },
      { query: OBTENER_CLIENTES_X_USUARIO }
    ],
    onError: (error) => {
      // Log the full error for debugging
      console.error('Error deleting client:', error);
      
      // Throw a more user-friendly error message
      throw new Error(error.message || 'Failed to delete client');
    }
  });

  const handleDeleteClient = async (id: string) => {
    try {
      const result = await deleteClient({
        variables: { id }
      });

      // Check if we have valid data before accessing it
      if (!result?.data?.eliminarCliente) {
        throw new Error('Failed to delete client - no data returned');
      }

      return result.data.eliminarCliente;
    } catch (error) {
      // Re-throw the error to be handled by the component
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred while deleting the client');
    }
  };

  return {
    deleteClient: handleDeleteClient,
    loading,
    error
  };
};