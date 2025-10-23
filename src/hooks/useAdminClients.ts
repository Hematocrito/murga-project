import { useQuery } from '@apollo/client';
import { useState, useMemo } from 'react';
import { OBTENER_CLIENTES_X_USUARIO } from '../graphql/queries/admin';
import { UserWithClients } from '../types/admin';
import { CLIENT_STATUS, CLIENT_STATUS_LABELS } from '../constants/clientStatus';
//import { Client } from '../types/client';

const ITEMS_PER_PAGE = 10;

export const useAdminClients = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const { data, loading, error } = useQuery(OBTENER_CLIENTES_X_USUARIO, {
    fetchPolicy: 'network-only'
  });

  const users: UserWithClients[] = data?.obtenerClientesxUsuario || [];

  const STATUS_LABEL_MAP = CLIENT_STATUS_LABELS as Record<string, string>;
  const STATUS_VALUES = Object.values(CLIENT_STATUS) as string[];
  const fallbackKey = CLIENT_STATUS.PENDIENTE;

  const resolveStatus = (estado?: string | null) => {
    const normalized = (estado || '').trim().toLowerCase();

    if (!normalized) {
      return {
        key: fallbackKey,
        label: STATUS_LABEL_MAP[fallbackKey]
      };
    }

    const knownKey = STATUS_VALUES.find((value) => value === normalized);

    if (knownKey) {
      return {
        key: knownKey,
        label: STATUS_LABEL_MAP[knownKey]
      };
    }

    const labelMatch = Object.entries(STATUS_LABEL_MAP).find(
      ([, label]) => label.toLowerCase() === normalized
    );

    if (labelMatch) {
      const [key, label] = labelMatch as [string, string];
      return { key, label };
    }

    return {
      key: normalized,
      label: estado || STATUS_LABEL_MAP[fallbackKey]
    };
  };

  // Flatten all clients into a single array with lawyer info and transform to Client type
  const allClients = useMemo(() => 
    users.flatMap(user => 
      user.clientes.map(client => {
        const { key: statusKey, label: statusLabel } = resolveStatus(client.estado);
        return {
          id: client.id,
          nombre: client.nombre || '',
          apellido: client.apellido || '',
          email: client.email || '',
          telefono: client.telefono || '',
          empresa: client.empresa || '',
          estado: statusKey,
          estadoLabel: statusLabel,
          estadoOriginal: client.estado || '',
          avatar: client.avatar || '',
          dni: client.dni || '',
          notas: client.notas || '',
          lawyer: `${user.nombre || ''} ${user.apellido || ''}`.trim()
        };
      })
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
        client.dni
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
    searchQuery,
    totalClients: allClients.length
  };
};
