import { useQuery } from '@apollo/client';
import { OBTENER_CLIENTE } from '../graphql/queries/clients';
import { OBTENER_CLIENTES_X_USUARIO } from '../graphql/queries/admin';
import { Cliente } from '../types/Cliente';

export const useAdminClientDetails = (id: string) => {
  // Get the specific client details
  const { data: clientData, loading: clientLoading, error: clientError } = useQuery(OBTENER_CLIENTE, {
    variables: { id },
    fetchPolicy: 'network-only'
  });

  // Get all clients to find the assigned lawyer
  const { data: adminData, loading: adminLoading } = useQuery(OBTENER_CLIENTES_X_USUARIO, {
    fetchPolicy: 'network-only'
  });

  const loading = clientLoading || adminLoading;
  const error = clientError;

  let client: (Cliente & { lawyer?: string }) | null = null;

  if (clientData?.obtenerCliente && adminData?.obtenerClientesxUsuario) {
    const clientDetails = clientData.obtenerCliente;
    
    // Find the lawyer assigned to this client
    const assignedLawyer = adminData.obtenerClientesxUsuario.find((user: { nombre: string; apellido: string; clientes: { id: string }[] }) => 
      user.clientes.some(c => c.id === id)
    );

    client = {
      ...clientDetails,
      lawyer: assignedLawyer ? `${assignedLawyer.nombre} ${assignedLawyer.apellido}`.trim() : undefined
    };
  }

  return { client, loading, error };
};