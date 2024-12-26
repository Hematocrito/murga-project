import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Building2, Mail, Phone, MapPin, Globe, 
  Calendar, Users as EmployeesIcon, BadgeDollarSign, 
  ClipboardList 
} from 'lucide-react';
import { clients } from '../data/clients';


export const ClientDetail: React.FC = () => {
  const { id } = useParams();
  const client = clients.find(c => c.id === Number(id));


  if (!client) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Cliente no encontrado</h2>
          <Link to="/" className="text-indigo-600 hover:text-indigo-800">
            Volver a la lista
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver a la lista
      </Link>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <div className="flex items-center space-x-6 mb-8">
            <img
              src={client.avatar}
              alt={client.nombre}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{client.nombre} {client.apellido}</h1>
              <div className="mt-2 flex items-center">
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
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Información de Contacto
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Building2 className="w-5 h-5 mr-3" />
                    <span>{client.empresa}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-5 h-5 mr-3" />
                    <span>{client.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-5 h-5 mr-3" />
                    <span>{client.telefono}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-3" />
                    <span>{`${client.address}, ${client.city}, ${client.country}`}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Globe className="w-5 h-5 mr-3" />
                    <a
                      href={`https://${client.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      {client.website}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Detalles de la Empresa
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-3" />
                    <span>Cliente desde: {new Date(client.joinDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <EmployeesIcon className="w-5 h-5 mr-3" />
                    <span>{client.employees} empleados</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <BadgeDollarSign className="w-5 h-5 mr-3" />
                    <span>Ingresos: {client.revenue}</span>
                  </div>
                  <div className="flex items-start text-gray-600">
                    <ClipboardList className="w-5 h-5 mr-3 mt-1" />
                    <span>{client.notas}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};