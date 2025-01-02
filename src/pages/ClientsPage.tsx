import { UserPlus } from 'lucide-react';
import { ClientCard } from '../components/ClientCard';
import { Pagination } from '../components/Pagination';
//import { clients } from '../data/clients';
import { Users } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { useClientSearch } from '../hooks/useClientSearch';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useClients } from '../hooks/useClients';


const ClientsPage = () => {
  const { clients, loading, error } = useClients();
  
  const {
    searchTerm,
    currentPage,
    totalPages,
    paginatedClients,
    handleSearchChange,
    handlePageChange,
  } = useClientSearch(clients);
  console.log('Clientes ####### ', clients);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
      <div className="flex items-center">
          <Users className="w-8 h-8 text-sky-800 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
        </div>
        
        <Link
          to="/clientes/nuevo"
          className="flex items-center space-x-2 bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <UserPlus className="w-5 h-5 mr-2" />
          Nuevo Cliente
        </Link>
      </div>
      <div className="w-full md:w-96 mb-2">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {paginatedClients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ClientsPage;