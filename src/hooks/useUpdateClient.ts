import { useMutation } from '@apollo/client';
import { ACTUALIZAR_CLIENTE } from '../graphql/mutations/clients';
import { OBTENER_CLIENTES_USUARIO } from '../graphql/queries/clients';

export const useUpdateClient = () => {
  const [updateClient, { loading, error }] = useMutation(ACTUALIZAR_CLIENTE, {
    refetchQueries: [{ query: OBTENER_CLIENTES_USUARIO }],
    onError: (error) => {
      console.error('Error updating client:', error);
    }
  });

  const handleUpdateClient = async (id: string, clientData: any) => {
    try {
      const { data } = await updateClient({
        variables: {
          id,
          input: {
            nombre: clientData.firstName,
            apellido: clientData.lastName,
            email: clientData.email,
            telefono: clientData.phone,
            empresa: clientData.company,
            estado: clientData.state,
            avatar: clientData.avatar
          }
        }
      });
      return data.actualizarCliente;
    } catch (error) {
      throw error;
    }
  };

  return {
    updateClient: handleUpdateClient,
    loading,
    error
  };
};