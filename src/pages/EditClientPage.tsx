import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import FormField from '../components/forms/FormField';
import FormActions from '../components/forms/FormActions';
import AvatarUpload from '../components/forms/AvatarUpload';
import FileUpload from '../components/forms/FileUpload';
import RichTextEditor from '../components/forms/RichTextEditor';
import useClientForm from '../hooks/useClientForm';
import { useClientDetails } from '../hooks/useClientDetails';
import { useUpdateClient } from '../hooks/useUpdateClient';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { CLIENT_STATUS, CLIENT_STATUS_LABELS } from '../constants/clientStatus';
import { useAuth } from '../context/AuthContext';

const EditClientPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [showSuccess, setShowSuccess] = React.useState(false);
  const { client, loading: loadingClient } = useClientDetails(id!);
  const { updateClient, loading: updating, error: updateError } = useUpdateClient();
  const { 
    formData, 
    errors, 
    handleChange, 
    handleAvatarChange, 
    handleNotesChange, 
    setFormData,
    attachments,
    handleAttachmentsChange
  } = useClientForm();

  useEffect(() => {
    if (client) {
      setFormData({
        firstName: client.nombre || '',
        lastName: client.apellido || '',
        email: client.email || '',
        phone: client.telefono || '',
        company: client.empresa || '',
        state: client.estado.toLowerCase() || '',
        notes: client.notas || '',
        avatar: client.avatar || '',
        dni: client.dni || '',
        attachments: attachments || [],
      });
    }
  }, [client, setFormData, attachments]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const archivosPayload = formData.attachments.length
        ? formData.attachments.map((file) =>
            JSON.stringify({
              name: file.name,
              type: file.type,
              data: file.data
            })
          )
        : null;
      console.log('Archivos Payload:', formData.attachments, archivosPayload);    
      // 1) Actualiza los datos basicos del cliente mediante GraphQL
      await updateClient(id!, {
        nombre: formData.firstName,
        apellido: formData.lastName,
        email: formData.email,
        telefono: formData.phone,
        empresa: formData.company,
        estado: formData.state,
        avatar: formData.avatar,
        dni: formData.dni,
        ...(archivosPayload ? { archivos: archivosPayload } : {}),
        notas: formData.notes
      });
      setShowSuccess(true);
      setTimeout(() => {
        navigate(isAdmin ? '/admin' : `/clientes/${id}`);
      }, 2000);
    } catch (err) {
      console.error('Error updating client:', err);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-4" />
          <h2 className="text-base font-bold mb-4">Actualización completada con éxito</h2>
          <p className="text-gray-600">
            ¡Perfecto! Ya está actualizada la información.
          </p>
          <p className="text-gray-500 text-sm">
            Ya casi...
          </p>
        </div>
      </div>
    );
  }

  if (loadingClient) {
    return <LoadingSpinner />;
  }

  if (!client) {
    return (
      <div className="bg-red-50 text-red-500 p-4 rounded-lg">
        Client not found
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => navigate(isAdmin ? '/admin' : `/clientes/${id}`)}
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Volver a {isAdmin ? 'Panel de Administración' : 'Detalles del Cliente'}
      </button>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-base font-bold mb-6">Editar Cliente</h2>

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

            <FormField label="DNI">
              <input
                type="text"
                name="dni"
                value={formData.dni}
                onChange={handleChange}
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
                {Object.entries(CLIENT_STATUS).map(([, value]) => (
                  <option key={value} value={value}>
                    {CLIENT_STATUS_LABELS[value]}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label={<>Adjuntos ({attachments.length}/3)</>} className="md:col-span-1">
              <FileUpload
                files={attachments}
                onChange={handleAttachmentsChange}
                maxFiles={3}
                showHeader={false}
              />
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
            cancelPath={isAdmin ? '/admin' : `/clientes/${id}`}
            submitText={updating ? 'Guardando...' : 'Guardar Cambios'} 
          />
        </form>
      </div>
    </div>
  );
};

export default EditClientPage;

