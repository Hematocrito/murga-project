import React from 'react';
//import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Building2, Mail, Phone } from 'lucide-react';
import { Client } from '../types/Client';

interface ClientCardProps {
  client: Client;
}

export const ClientCard: React.FC<ClientCardProps> = ({ client }) => {

  return (
    <Link
      to={`/client/${client.id}`}
      className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <img
            src={client.avatar}
            alt={client.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  client.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {client.status}
              </span>
            </div>
            <div className="mt-2 space-y-2">
              <div className="flex items-center text-gray-600">
                <Building2 className="w-4 h-4 mr-2" />
                {client.company}
              </div>
              <div className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                {client.email}
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                {client.phone}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
