import { UserPlus } from 'lucide-react';
import { Pagination } from '../components/Pagination';
//import { clients } from '../data/clients';
import { SearchBar } from '../components/SearchBar';
import { useClientSearch } from '../hooks/useClientSearch';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useClients } from '../hooks/useClients';
import { useEffect } from 'react';
import ClientList from '../components/clients/ClientList';


const ClientsPage = () => {
  const { clients, loading, error } = useClients();

  useEffect(() => {
    console.log('Clients:', clients); // Para debug
  }, [clients]);
  
  const {
    searchTerm,
    currentPage,
    totalPages,
    paginatedClients,
    handleSearchChange,
    handlePageChange,
  } = useClientSearch(clients);

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
            <span>Total clients: <strong>{clients.length}</strong></span>
          </p>
        </div>
          
        <Link
          to="/clientes/nuevo"
          className="flex items-center space-x-2 bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <UserPlus className="w-5 h-5 mr-2" />
          Nuevo Cliente
        </Link>
        <div className="w-full md:w-96 mb-2">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
          />
        </div>
      </div>  
       {/*
      <div className="grid gap-6 md:grid-cols-2">
        {paginatedClients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div> */ }
      {error ? (
          <div className="p-4 text-red-600">Error cargando clientes</div>
        ) : (
          <div className="overflow-x-auto">
            <ClientList clients={paginatedClients} loading={loading} />
          </div>
        )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />    
    </div>
  );
};

export default ClientsPage;