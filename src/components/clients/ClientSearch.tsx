import React from 'react';
import { Search } from 'lucide-react';

interface ClientSearchProps {
  onSearch: (query: string) => void;
}

const ClientSearch: React.FC<ClientSearchProps> = ({ onSearch }) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search clients..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

export default ClientSearch;