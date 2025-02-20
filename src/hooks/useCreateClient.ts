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
      //console.log('clientData!!!!!!!!!!!!!', clientData);

      const { data } = await createClient({
        variables: {
          input: {
            nombre: clientData.firstName,
            apellido: clientData.lastName,
            empresa: clientData.company,
            email: clientData.email,
            telefono: clientData.phone,            
            avatar: clientData.avatar,//avatarBase64 || '',
            dni: clientData.dni,
            estado: clientData.state,
            notas: clientData.notes
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