//import React, { useState, useMemo } from 'react';
import { useAdminClients } from '../hooks/useAdminClients';
import { Users, Search } from 'lucide-react';
import Pagination from '../components/common/Pagination';
import LoadingSpinner from '../components/common/LoadingSpinner';
import AdminClientList from '../components/admin/AdminClientList';


const AdminDashboardPage = () => {  
  const {
    clients,
    loading,
    error,
    currentPage,
    totalPages,
    handlePageChange,
    handleSearch,
    searchQuery
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
          <div className="flex items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <h2 className="text-xs md:text-sm font-semibold">Todos los Clientes</h2>
            </div>
            {/* Search Box */}
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por nombre o documento..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-0.5 focus:ring-black focus:border-black focus:outline-none text-xs md:text-sm"
              />
            </div>
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