import { useMutation } from '@apollo/client';
import { ACTUALIZAR_CLIENTE } from '../graphql/mutations/clients';
import { OBTENER_CLIENTES_USUARIO } from '../graphql/queries/clients';
import { OBTENER_CLIENTES_X_USUARIO } from '../graphql/queries/admin';

export const useUpdateClient = () => {
  const [updateClient, { loading, error }] = useMutation(ACTUALIZAR_CLIENTE, {
    refetchQueries: [
      { query: OBTENER_CLIENTES_USUARIO },
      { query: OBTENER_CLIENTES_X_USUARIO }
    ],
    onError: (error) => {
      console.error('Error updating client:', error);
    }
  });

  const handleUpdateClient = async (id: string, clientData: any) => {
    console.log('Updating client with data:', clientData);
    try {
      const input: any = {
        nombre: clientData.nombre,
        apellido: clientData.apellido,
        email: clientData.email,
        telefono: clientData.telefono,
        empresa: clientData.empresa,
        estado: clientData.estado,
        avatar: clientData.avatar,
        dni: clientData.dni,
        notas: clientData.notas
      };

      if (clientData.archivos && clientData.archivos.length > 0) {
        input.archivos = clientData.archivos;
      }

      const { data } = await updateClient({
        variables: {
          id,
          input
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
