import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import ClientList from '../components/clients/ClientList';
import ClientSearch from '../components/clients/ClientSearch';
import Pagination from '../components/common/Pagination';
import { useClients } from '../hooks/useClients';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ClientsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { clients, loading, error, page, totalPages, handlePageChange } = useClients();

  const filteredClients = useMemo(() => 
    clients.filter(client => 
      `${client.nombre} ${client.apellido} ${client.email} ${client.empresa}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    ),
    [clients, searchQuery]
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Clientes</h1>
          <p className="text-gray-600 mt-1">
          <span>Total de clientes: <strong>{clients.length}</strong></span>
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

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <ClientSearch onSearch={setSearchQuery} />
        </div>


        {error ? (
          <div className="p-4 text-red-600">
            Error loading clients. Please try again later.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <ClientList clients={filteredClients} loading={loading} />
            </div>
            <div className="border-t">
              <Pagination
                currentPage={page}
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

export default ClientsPage;