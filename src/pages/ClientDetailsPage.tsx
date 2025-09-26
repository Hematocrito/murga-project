//import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Building2, 
  Mail, 
  Phone, 
  User,
  Globe,
  AlertCircle,
  CreditCard,
  Pencil
} from 'lucide-react';
import { useClientDetails } from '../hooks/useClientDetails';
import { useAdminClientDetails } from '../hooks/useAdminClientDetails';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ClientStatusBadge from '../components/clients/ClientStatusBadge';

const ClientDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  // Use the appropriate hook based on user role
  const {
    client,
    loading,
    error
  } = isAdmin ? useAdminClientDetails(id!) : useClientDetails(id!);
  console.log('Client Details:', client);
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !client) {
    return (
      <div className="bg-red-50 text-red-500 p-4 rounded-lg flex items-center">
        <AlertCircle className="w-5 h-5 mr-2" />
        {error?.message || 'Client not found'}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(isAdmin ? '/admin' : '/clientes')}
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver a {isAdmin ? 'Panel de Administración' : 'Clientes'}
        </button>
        <button
          onClick={() => navigate(`/clientes/${id}/editar`)}
          className="inline-flex items-center px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Pencil className="w-5 h-5 mr-2" />
          Editar Cliente
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        {/* Header Section */}
        <div className="p-6 border-b">
          <div className="flex items-center space-x-4">
            {client.avatar ? (
              <img
                src={client.avatar}
                alt={`${client.nombre} ${client.apellido}`}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-8 h-8 text-gray-400" />
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold">
                {client.nombre} {client.apellido}
              </h1>
              <div className="flex items-center mt-2 space-x-3">
                {client.estado &&
                  <ClientStatusBadge status={client.estado} />
                }  
                <span className="text-black">{client.empresa}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold mb-4">Información de Contacto</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <Mail className="w-5 h-5 mr-3" />
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <a 
                    href={`mailto:${client.email}`}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    {client.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="w-5 h-5 mr-3" />
                <div>
                  <div className="text-sm text-gray-500">Teléfono</div>
                  <a 
                    href={`tel:${client.telefono}`}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    {client.telefono}
                  </a>
                </div>
              </div>
              <div className="flex items-center text-gray-600">
                <CreditCard className="w-5 h-5 mr-3" />
                <div>
                  <div className="text-sm text-gray-500">DNI</div>
                  <div className='text-black'>{client.dni || 'Dato inexistente'}</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <Building2 className="w-5 h-5 mr-3" />
                <div>
                  <div className="text-sm text-gray-500">Empresa</div>
                  <div className='text-black'>{client.empresa}</div>
                </div>
              </div>
              <div className="flex items-center text-gray-600">
                <Globe className="w-5 h-5 mr-3" />
                <div>
                  <div className="text-sm text-gray-500">Estado</div>
                  <div className='text-black'>{client.estado}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notes Section */}
        {client.notas && (
          <div className="p-0 md:p-6">
            <h2 className="text-lg font-semibold mb-4">Notas</h2>
            <div 
              className="prose max-w-none bg-gray-50 p-4 rounded-lg text-justify"
              dangerouslySetInnerHTML={{ __html: client.notas }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ClientDetailsPage;