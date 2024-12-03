import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { ClientCard } from '../components/ClientCard';
import { Pagination } from '../components/Pagination';
import { clients } from '../data/clients';
import { Users } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';


const Clientes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 6;
  const totalPages = Math.ceil(clients.length / clientsPerPage);

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
      <div className="flex items-center">
          <Users className="w-8 h-8 text-sky-800 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
        </div>
        <button className="flex items-center space-x-2 bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <UserPlus size={20} />
          <span>Nuevo Cliente</span>
        </button>
      </div>
      <div className="w-full md:w-96 mb-2">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {currentClients.map((client) => (
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

export default Clientes;