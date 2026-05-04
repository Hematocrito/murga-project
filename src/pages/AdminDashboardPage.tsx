//import React from 'react';
import { CheckCircle, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
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
    totalClients,
    pendingUsers,
    approveUser,
    authorizingUser
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
          <h1 className="text-base font-bold">Panel de administración</h1>
          <p className="text-base text-gray-600 mt-1">
            <span>Total de clientes: <strong>{totalClients}</strong></span>
          </p>
        </div>
        <Link
          to="/clientes/nuevo"
          className="inline-flex items-center px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <UserPlus className="w-5 h-5 mr-2" />
          Nuevo Cliente
        </Link>
      </div>

      {pendingUsers.length > 0 && (
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-4 border-b">
            <h2 className="text-sm font-semibold text-gray-900">Usuarios pendientes de autorizacion</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {pendingUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between gap-4 p-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {user.nombre} {user.apellido}
                  </p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <button
                  type="button"
                  disabled={authorizingUser}
                  onClick={() => approveUser(user.id)}
                  className="inline-flex items-center px-3 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-60"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Autorizar
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <ClientSearch onSearch={handleSearch} />
        </div>


        {error ? (
          <div className="p-4 text-red-600">
            Error loading clients. Please try again later.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <AdminClientList clients={clients} loading={loading} />
            </div>
            <div className="border-t">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
