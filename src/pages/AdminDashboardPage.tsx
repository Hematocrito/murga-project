//import React from 'react';
import { Users } from 'lucide-react';
import { useAdminClients } from '../hooks/useAdminClients';
import AdminClientList from '../components/admin/AdminClientList';
import ClientSearch from '../components/clients/ClientSearch';
import Pagination from '../components/common/Pagination';
import LoadingSpinner from '../components/common/LoadingSpinner';

const AdminDashboardPage = () => {  
  const {
    clients,
    loading,
    error,
    currentPage,
    totalPages,
    handlePageChange,
    handleSearch,
    totalClients
  } = useAdminClients();
  
  if (loading) return <LoadingSpinner />;
  
  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-50 rounded-lg">
        Error cargando datos. Por favor, intente mas tarde.
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-lg font-bold">Panel de administración</h1>
          <p className="text-gray-600 mt-1">
            Gestionar todos los clientes y sus abogados asignados
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold">Todos los Clientes</h2>
            </div>
            <div className="bg-blue-50 text-blue-800 px-4 py-2 rounded-lg font-semibold">
              Total Clientes: {totalClients}
            </div>
          </div>

          <div className="mb-6">
            <ClientSearch onSearch={handleSearch} />
          </div>
          <div className="overflow-x-auto">
            <AdminClientList clients={clients} loading={loading} />
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