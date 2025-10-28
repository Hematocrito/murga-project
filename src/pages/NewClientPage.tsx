import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import FormField from '../components/forms/FormField';
import FormActions from '../components/forms/FormActions';
import AvatarUpload from '../components/forms/AvatarUpload';
import RichTextEditor from '../components/forms/RichTextEditor';
import useClientForm from '../hooks/useClientForm';
import { useCreateClient } from '../hooks/useCreateClient';
import { CLIENT_STATUS_LABELS } from '../constants/clientStatus';
import { useAuth } from '../context/AuthContext';

const NewClientPage = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const { formData, errors, handleChange, handleAvatarChange, handleNotesChange } = useClientForm();
  const { createClient, loading, error } = useCreateClient();

  /*
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createClient(formData);
      navigate(isAdmin ? '/admin' : '/clients');
    } catch (err) {
      console.error('Error creating client:', err);
    }
  }; */

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //console.log('DATOS!!!!!!!! ', formData);
    try {
      await createClient(formData);
      navigate(isAdmin ? '/admin' : '/clientes');
    } catch (err) {
      console.error('Error al crear cliente:', err);
    }
  };

  return (
    <div>
      <button
        onClick={() => navigate(isAdmin ? '/admin' : '/clients')}
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
         Volver a {isAdmin ? 'Panel de Administración' : 'Detalles del Cliente'}
      </button>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-base font-bold mb-6">Nuevo Cliente</h2>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
            {error.message || 'Error creando cliente. Por favor, inténtelo de nuevo.'}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          <AvatarUpload onChange={handleAvatarChange} />
          
          <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
            <FormField label={<>Nombre <span className="text-red-500">*</span></>} required>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </FormField>

            <FormField label={<>Apellido <span className="text-red-500">*</span></>} required>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </FormField>

            <FormField label="Email">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.email ? 'border-red-500' : ''
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </FormField>

            <FormField label="Teléfono">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </FormField>

            <FormField label={<>DNI <span className="text-red-500">*</span></>} required>
              <input
                type="text"
                name="dni"
                value={formData.dni}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.dni ? 'border-red-500' : ''
                }`}
              />
              {errors.dni && (
                <p className="mt-1 text-sm text-red-500">{errors.dni}</p>
              )}
            </FormField>

            <FormField label="Empresa">
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </FormField>

            <FormField label={<>Estado <span className="text-red-500">*</span></>} required>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Seleccionar estado</option>
                {Object.entries(CLIENT_STATUS_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </FormField>
          </div>

          <FormField label="Notas">
            <RichTextEditor
              value={formData.notes}
              onChange={handleNotesChange}
              placeholder="Agregar notas acerca del cliente..."
            />
          </FormField>

          <FormActions 
            cancelPath={isAdmin ? '/admin' : '/clientes'}
            submitText={loading ? 'Creando...' : 'Crear Cliente'} 
          />
        </form>
      </div>
    </div>
  );
};

export default NewClientPage;
