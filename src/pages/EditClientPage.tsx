import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import FormField from '../components/forms/FormField';
import FormActions from '../components/forms/FormActions';
import AvatarUpload from '../components/forms/AvatarUpload';
import RichTextEditor from '../components/forms/RichTextEditor';
import useClientForm from '../hooks/useClientForm';
import { useClientDetails } from '../hooks/useClientDetails';
import { useUpdateClient } from '../hooks/useUpdateClient';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { CLIENT_STATUS_LABELS } from '../constants/clientStatus';

const EditClientPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { client, loading: loadingClient } = useClientDetails(id!);
  const { updateClient, loading: updating, error: updateError } = useUpdateClient();
  const { 
    formData, 
    errors, 
    handleChange, 
    handleAvatarChange, 
    handleNotesChange, 
    setFormData 
  } = useClientForm();

  useEffect(() => {
    if (client) {
      setFormData({
        firstName: client.nombre,
        lastName: client.apellido,
        email: client.email,
        phone: client.telefono,
        company: client.empresa,
        state: client.estado,
        notes: client.notas || '',
        avatar: client.avatar,
        dni: client.dni || '',
      });
    }
  }, [client, setFormData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateClient(id!, formData);
      navigate(`/clientes/${id}`);
    } catch (err) {
      console.error('Error modificando cliente:', err);
    }
  };

  if (loadingClient) {
    return <LoadingSpinner />;
  }

  if (!client) {
    return (
      <div className="bg-red-50 text-red-500 p-4 rounded-lg">
        Cliente no encontrado
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => navigate(`/clientes/${id}`)}
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Volver a los Detalles del Cliente
      </button>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Editar Cliente</h2>

        {updateError && (
          <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
            Error actualizando cliente. Por favor, intente otra vez.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <AvatarUpload 
            onChange={handleAvatarChange}
            initialValue={formData.avatar}
          />
          
          <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
          <FormField label={<>Nombre <span className="text-red-500">*</span></>} required>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-1 focus:ring-slate-300 focus:border-slate-300"
              />
            </FormField>

            <FormField label={<>Apellido <span className="text-red-500">*</span></>} required>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-1 focus:ring-slate-300 focus:border-slate-300"
              />
            </FormField>

            <FormField label="Email">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-1 focus:ring-slate-300 focus:border-slate-300 ${
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
                className="w-full px-4 py-2 border rounded-lg focus:ring-1 focus:ring-slate-300 focus:border-slate-300"
              />
            </FormField>

            <FormField label="DNI">
              <input
                type="text"
                name="dni"
                value={formData.dni}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-1 focus:ring-slate-300 focus:border-slate-300 ${
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
                className="w-full px-4 py-2 border rounded-lg focus:ring-1 focus:ring-slate-300 focus:border-slate-300"
              />
            </FormField>

            <FormField label={<>Estado <span className="text-red-500">*</span></>} required>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-1 focus:ring-slate-300 focus:border-slate-300"
              >
                <option value="">Select status</option>
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
            cancelPath={`/clientes/${id}`}
            submitText={updating ? 'Guardando...' : 'Guardar Cambios'} 
          />
        </form>
      </div>
    </div>
  );
};

export default EditClientPage;