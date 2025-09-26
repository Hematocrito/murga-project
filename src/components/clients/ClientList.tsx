import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, User } from 'lucide-react';
import { Cliente } from '../../types/Cliente';
import ClientStatusBadge from './ClientStatusBadge';

interface ClientListProps {
  clients: Cliente[];
  loading: boolean;
}

const ClientList: React.FC<ClientListProps> = ({ clients, loading }) => {
  //console.log('Clientes en lista de clientes:', clients); // Para debug
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="animate-pulse">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="h-16 bg-gray-100 mb-2 rounded-lg"></div>
        ))}
      </div>
    );
  }

  return (
    <table className="w-full">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Nombre
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Email
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Empresa
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Estado
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {clients.map((client) => (
          <tr
            key={client.id}
            className="hover:bg-gray-50 transition-colors"
          >
            <td 
              className="px-6 py-4 whitespace-nowrap cursor-pointer"
              onClick={() => navigate(`/clientes/${client.id}`)}
            >
              <div className="flex items-center">
                {client.avatar ? (
                  <img
                    src={client.avatar}
                    alt={`${client.nombre} ${client.apellido}`}
                    className="h-8 w-8 rounded-full mr-3"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    <User className="w-6 h-6 text-gray-400" />
                  </div>
                )}
                <div className='text-sm font-medium text-gray-900'>
                  {client.nombre} {client.apellido}
                </div>
              </div>
            </td>
            <td 
              className="px-6 py-4 whitespace-nowrap cursor-pointer text-sm text-gray-500"
              onClick={() => navigate(`/clientes/${client.id}`)}
            >
              {client.email}
            </td>
            <td 
              className="px-6 py-4 whitespace-nowrap cursor-pointer text-sm text-gray-500"
              onClick={() => navigate(`/clientes/${client.id}`)}
            >
              {client.empresa}
            </td>
            <td 
              className="px-6 py-4 whitespace-nowrap cursor-pointer"
              onClick={() => navigate(`/clientes/${client.id}`)}
            >
              {client.estado && 
                <ClientStatusBadge status={client.estado} />
              }
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button
                onClick={() => navigate(`/clientes/${client.id}/editar`)}
                className="text-blue-600 hover:text-blue-800 transition-colors"
                title="Editar"
              >
                <Pencil className="w-4 h-4 text-blue-800" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClientList;