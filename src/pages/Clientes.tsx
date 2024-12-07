import { useEffect, useState } from 'react';
import { UserPlus } from 'lucide-react';
import { ClientCard } from '../components/ClientCard';
import { Pagination } from '../components/Pagination';
//import { clients } from '../data/clients';
import { Users } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { gql, useQuery } from "@apollo/client";
import { Cliente } from '../types/Cliente';
import { useClientSearch } from '../hooks/useClientSearch';


const OBTENER_CLIENTES_USUARIO = gql`
  query obtenerClientesVendedor {
    obtenerClientesVendedor {
      id
      nombre
      apellido
      avatar
      empresa
      email
      telefono
      estado
    }
  }
`;

const Clientes = () => {
  //Consulta de Apollo
  const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO);
  const [clients, setClients] = useState<Cliente[]>([]);

  console.log('DATA ', data);
  console.log(loading);
  console.log(error);

  useEffect(() => {
    if (data) {
      setClients(data.obtenerClientesVendedor);
    }
  }, [data]);

  const {
    searchTerm,
    currentPage,
    totalPages,
    paginatedClients,
    handleSearchChange,
    handlePageChange,
  } = useClientSearch(clients);
  console.log('MOKA ', clients);


  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

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

export default Clientes;