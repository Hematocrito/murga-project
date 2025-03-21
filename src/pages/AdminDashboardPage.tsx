import React from 'react';
import { Users } from 'lucide-react';
import { useQuery } from '@apollo/client';
import { OBTENER_CLIENTES_X_USUARIO } from '../graphql/queries/admin';
import Pagination from '../components/common/Pagination';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { UserWithClients } from '../types/admin';
import ClientStatusBadge from '../components/clients/ClientStatusBadge';
import ThreeDotsMenu from '../components/common/ThreeDotsMenu';

const ITEMS_PER_PAGE = 10;

const AdminDashboardPage = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  
  const { data, loading, error } = useQuery(OBTENER_CLIENTES_X_USUARIO);
  const users: UserWithClients[] = data?.obtenerClientesxUsuario || [];

  // Flatten all clients into a single array with lawyer info
  const allClients = users.flatMap(user => 
    user.clientes.map(client => ({
      ...client,
      lawyer: `${user.nombre} ${user.apellido}`
    }))
  );
  console.log('ALL CLIENTS: ', allClients);
  const totalPages = Math.ceil(allClients.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentClients = allClients.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEdit = (clientId: string) => {
    console.log('Edit client:', clientId);
  };

  const handleDelete = (clientId: string) => {
    console.log('Delete client:', clientId);
  };

  if (loading) return <LoadingSpinner />;
  
  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-50 rounded-lg">
        Error loading data. Please try again later.
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Manage all clients and their assigned lawyers
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">All Clients</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    DNI
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned Lawyer
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentClients.map((client, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          {client.nombre} {client.apellido}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {client.dni}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <ClientStatusBadge status={client.estado || 'pending'} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {client.lawyer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex justify-center">
                      <ThreeDotsMenu
                        onEdit={() => handleEdit(client.dni)}
                        onDelete={() => handleDelete(client.dni)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;