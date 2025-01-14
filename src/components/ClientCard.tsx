import React from 'react';
//import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Building2, Mail, Phone, User } from 'lucide-react';
import { Cliente } from '../types/Cliente';
import ClientStatusBadge from './clients/ClientStatusBadge';

interface ClientCardProps {
  client: Cliente;
}

export const ClientCard: React.FC<ClientCardProps> = ({ client }) => {

  return (
    <Link
      to={`/clientes/${client.id}`}
      className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="p-2 md:p-6">
        <div className="flex items-center space-x-1 md:space-x-4">
          {client.avatar ? (
            <img
              src={client.avatar?.toString()}
              alt={client.nombre}
              className="w-14 h-14 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-8 h-8 text-gray-400" />
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{client.nombre} {client.apellido}</h3>
              {client.estado && 
                <ClientStatusBadge status={client.estado} />
              }
            </div>
            <div className="mt-2 space-y-2">
              <div className="flex items-center text-gray-600 text-sm md:text-base">
                <Building2 className="w-4 h-4 mr-2" />
                {client.empresa}
              </div>
              <div className="flex items-center text-gray-600 text-sm md:text-base">
                <Mail className="w-4 h-4 mr-2" />
                {client.email}
              </div>
              <div className="flex items-center text-gray-600 text-sm md:text-base">
                <Phone className="w-4 h-4 mr-2" />
                {client.telefono}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
