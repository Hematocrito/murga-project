import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { useQuery } from '@apollo/client';
import { OBTENER_CLIENTES_X_USUARIO } from '../graphql/queries/admin';
import Pagination from '../components/common/Pagination';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { UserWithClients } from '../types/admin';

const ITEMS_PER_PAGE = 5;

const AdminDashboardPage = () => {
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const { data, loading, error } = useQuery(OBTENER_CLIENTES_X_USUARIO, {
    fetchPolicy: 'network-only'
  });

  const users: UserWithClients[] = data?.obtenerClientesxUsuario || [];
  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentUsers = users.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setExpandedUser(null); // Close expanded view when changing pages
  };

  if (loading) return <LoadingSpinner />;
  
  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-50 rounded-lg">
        Error loading users data. Please try again later.
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Panel de Administración</h1>
          <p className="text-gray-600 mt-1">
            Administrar usuarios y sus clientes
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">System Users</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Clients
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentUsers.map((user: UserWithClients, index: number) => (
                  <React.Fragment key={index}>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {user.nombre} {user.apellido}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.clientes.length}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => setExpandedUser(expandedUser === String(index) ? null : String(index))}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          {expandedUser === String(index) ? 'Hide' : 'Show'} Clients
                        </button>
                      </td>
                    </tr>
                    {expandedUser === String(index) && (
                      <tr>
                        <td colSpan={3} className="px-6 py-4">
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="text-sm font-medium text-gray-900 mb-4">
                              Clients managed by {user.nombre} {user.apellido}
                            </h3>
                            <div className="overflow-x-auto">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                  <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                      Name
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                      DNI
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {user.clientes.map((client, clientIndex) => (
                                    <tr key={clientIndex} className="hover:bg-gray-50">
                                      <td className="px-4 py-2 whitespace-nowrap">
                                        <span>
                                          {client.nombre} {client.apellido}
                                        </span>
                                      </td>
                                      <td className="px-4 py-2 whitespace-nowrap">
                                        {client.dni}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;