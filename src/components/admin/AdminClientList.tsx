import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Cliente } from '../../types/Cliente';
import ClientStatusBadge from '../clients/ClientStatusBadge';
import ThreeDotsMenu from '../common/ThreeDotsMenu';
import { useDeleteClient } from '../../hooks/useDeleteClient';
import { User } from 'lucide-react';

interface AdminClientListProps {
  clients: (Cliente & { lawyer?: string })[];
  loading: boolean;
}

const AdminClientList: React.FC<AdminClientListProps> = ({ clients, loading }) => {
  const navigate = useNavigate();
  const { deleteClient } = useDeleteClient();
  console.log('Clientes %%%%%%%% ', clients);
  if (loading) {
    return (
      <div className="animate-pulse">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="h-16 bg-gray-100 mb-2 rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (clients.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No clients found.
      </div>
    );
  }

  return (
    <table className="w-full">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Nombre del cliente
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            DNI
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Estado
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Abogado Asignado
          </th>
          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {clients.map((client) => (
          <tr key={client.id} className="hover:bg-gray-50">
            <td 
              className="px-6 py-4 whitespace-nowrap cursor-pointer"
              onClick={() => navigate(`/clientes/${client.id}`)}
            >
              <div className="flex items-center">
              {client.avatar ? (
                  <img
                    src={client.avatar}
                    alt={`${client.nombre} ${client.apellido}`}
                    className="h-8 w-8 rounded-full mr-3 object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full mr-3 bg-gray-200 flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-500" />
                  </div>
                )}
                <div>
                  {client.nombre} {client.apellido}
                </div>
              </div>
            </td>
            <td 
              className="px-6 py-4 whitespace-nowrap cursor-pointer"
              onClick={() => navigate(`/clientes/${client.id}`)}
            >
              {client.dni || '-'}
            </td>
            <td 
              className="px-6 py-4 whitespace-nowrap cursor-pointer"
              onClick={() => navigate(`/clientes/${client.id}`)}
            >
              <ClientStatusBadge status={client.estado} />
            </td>
            <td 
              className="px-6 py-4 whitespace-nowrap cursor-pointer text-sm text-gray-500"
              onClick={() => navigate(`/clientes/${client.id}`)}
            >
              {client.lawyer || 'Unassigned'}
            </td>
            <td className="px-6 py-4 whitespace-nowrap flex justify-center">
              <ThreeDotsMenu
                onEdit={() => navigate(`/clientes/${client.id}/editar`)}
                onDelete={() => deleteClient(client.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminClientList;