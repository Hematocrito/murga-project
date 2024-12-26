import React from 'react';
//import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Building2, Mail, Phone } from 'lucide-react';
import { Cliente } from '../types/Cliente';

interface ClientCardProps {
  client: Cliente;
}

export const ClientCard: React.FC<ClientCardProps> = ({ client }) => {

  return (
    <Link
      to={`/clientes/${client.id}`}
      className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="p-4 md:p-6">
        <div className="flex items-center space-x-2 md:space-x-4">
          <img
            src={client.avatar?.toString()}
            alt={client.nombre}
            className="w-14 h-14 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{client.nombre} {client.apellido}</h3>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  client.estado === 'activo'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {client.estado}
              </span>
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
