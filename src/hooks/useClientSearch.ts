import { useState, useMemo } from 'react';
import { Cliente } from '../types/Cliente';

export function useClientSearch(clients: Cliente[], itemsPerPage: number = 6) {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredClients = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return clients.filter(
      (client) =>
        client.nombre.toLowerCase().includes(searchLower) ||
        client.apellido.toLowerCase().includes(searchLower) ||
        (client.dni?.toLowerCase().includes(searchLower) || false)
    );
  }, [clients, searchTerm]);

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const paginatedClients = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredClients.slice(start, start + itemsPerPage);
  }, [filteredClients, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  return {
    searchTerm,
    currentPage,
    totalPages,
    paginatedClients,
    handleSearchChange,
    handlePageChange,
  };
}