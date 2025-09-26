import { useMutation } from '@apollo/client';
import { ACTUALIZAR_CLIENTE } from '../graphql/mutations/clients';
import { OBTENER_CLIENTES_USUARIO } from '../graphql/queries/clients';
import { OBTENER_CLIENTES_X_USUARIO } from '../graphql/queries/admin';

const normalizeAttachments = (possible: unknown): string[] | undefined => {
  if (!Array.isArray(possible)) {
    return undefined;
  }

  const serialized = possible.reduce<string[]>((acc, item) => {
    if (typeof item === 'string') {
      acc.push(item);
      return acc;
    }

    if (item && typeof item === 'object') {
      const record = item as Record<string, unknown>;
      const data = record.data;
      if (typeof data === 'string') {
        const payload: Record<string, unknown> = { data };
        const name = record.name;
        const type = record.type;
        const size = record.size;

        if (typeof name === 'string') {
          payload.name = name;
        }
        if (typeof type === 'string') {
          payload.type = type;
        }
        if (typeof size === 'number') {
          payload.size = size;
        }

        acc.push(JSON.stringify(payload));
      }
    }

    return acc;
  }, []);

  return serialized;
};

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
    try {
      const attachments = normalizeAttachments(clientData.archivos ?? clientData.attachments);

      const input: Record<string, unknown> = {
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

      if (attachments !== undefined) {
        input.archivos = attachments;
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