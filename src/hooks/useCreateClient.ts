/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@apollo/client';
import { NUEVO_CLIENTE } from '../graphql/mutations/clients';
import { OBTENER_CLIENTES_USUARIO } from '../graphql/queries/clients';

export const useCreateClient = () => {
  const [createClient, { loading, error }] = useMutation(NUEVO_CLIENTE, {
    refetchQueries: [{ query: OBTENER_CLIENTES_USUARIO }],
    onError: (error) => {
      console.error('Error creating client:', error);
    }
  });

  const handleCreateClient = async (clientData: any) => {
    
      const { data } = await createClient({
        variables: {
          input: {
            nombre: clientData.firstName,
            apellido: clientData.lastName,
            email: clientData.email,
            telefono: clientData.phone,
            empresa: clientData.company,
            estado: clientData.state
          }
        }
      });
      return data.nuevoCliente;
  };

  return {
    createClient: handleCreateClient,
    loading,
    error
  };
};