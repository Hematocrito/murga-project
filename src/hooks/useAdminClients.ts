import { useQuery } from '@apollo/client';
import { useState, useMemo } from 'react';
import { OBTENER_CLIENTES_X_USUARIO } from '../graphql/queries/admin';
import { UserWithClients } from '../types/admin';
//import { Client } from '../types/client';

const ITEMS_PER_PAGE = 10;

export const useAdminClients = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const { data, loading, error } = useQuery(OBTENER_CLIENTES_X_USUARIO, {
    fetchPolicy: 'network-only'
  });

  const users: UserWithClients[] = data?.obtenerClientesxUsuario || [];

  // Flatten all clients into a single array with lawyer info and transform to Client type
  const allClients = useMemo(() => 
    users.flatMap(user => 
      user.clientes.map(client => ({
        id: client.id,
        nombre: client.nombre || '',
        apellido: client.apellido || '',
        email: '',
        telefono: '',
        empresa: '',
        estado: client.estado || '',
        avatar: client.avatar || '',
        dni: client.dni || '',
        lawyer: `${user.nombre || ''} ${user.apellido || ''}`.trim()
      }))
    ),
    [users]
  );

  // Filter clients based on search query
  const filteredClients = useMemo(() => {
    if (!searchQuery) return allClients;
    
    const query = searchQuery.toLowerCase().trim();
    return allClients.filter(client => {
      const searchableFields = [
        client.nombre,
        client.apellido,
        client.dni,
        (client as any).lawyer
      ].map(field => (field || '').toLowerCase());

      return searchableFields.some(field => field.includes(query));
    });
  }, [allClients, searchQuery]);

  const totalPages = Math.ceil(filteredClients.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentClients = filteredClients.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  return {
    clients: currentClients,
    loading,
    error,
    currentPage,
    totalPages,
    handlePageChange,
    handleSearch,
    searchQuery
  };
};