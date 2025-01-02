import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import FormField from '../components/forms/FormField';
import FormActions from '../components/forms/FormActions';
import AvatarUpload from '../components/forms/AvatarUpload';
import useClientForm from '../hooks/useClientForm';
import { useCreateClient } from '../hooks/useCreateClient';
import { CLIENT_STATUS_LABELS } from '../constants/clientStatus';
import RichTextEditor from '../components/forms/RichTextEditor';


const NewClientPage = () => {
  const navigate = useNavigate();
  const { formData, errors, handleChange, handleNotesChange, handleAvatarChange } = useClientForm();
  const { createClient, loading, error } = useCreateClient();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //console.log('DATOS!!!!!!!! ', formData);
    try {
      await createClient(formData);
      navigate('/clientes');
    } catch (err) {
      console.error('Error creating client:', err);
    }
  };

  return (
    <div>
      <button
        onClick={() => navigate('/clientes')}
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Volver a la lista
      </button>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Nuevo Cliente</h2>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
            Error creando cliente. Por favor, intente nuevamente.
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          <AvatarUpload onChange={handleAvatarChange} />
          
          {/* Grid container with responsive columns */}
          <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
            {/* Left Column */}
            <div className="space-y-4">
            <FormField
                label="Nombre"
                required
              >
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-300 focus:border-slate-300"
                />
              </FormField>

              <FormField
              label="Email"
              required
              >
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="example@email.com"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-300 focus:border-slate-300 ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </FormField>

              <FormField
                label="Empresa"
                required
              >
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-300 focus:border-slate-300"
                />
              </FormField>

              <FormField label="Estado" required>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-300 focus:border-slate-300"
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

            {/* Right Column */}
            <div className="space-y-4">
              <FormField
                label="Apellido"
                required
              >
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-300 focus:border-slate-300"
                />
              </FormField>

              <FormField
                label="Teléfono"
              >
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-300 focus:border-slate-300"
                />
              </FormField>

              <FormField
                label="DNI"
                required
              >
                <input
                  type="text"
                  name="dni"
                  value={formData.dni}
                  onChange={handleChange}
                  required
                  maxLength={8}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-300 focus:border-slate-300 ${
                    errors.dni ? 'border-red-500' : ''
                  }`}
                />
                {errors.dni && (
                  <p className="mt-1 text-sm text-red-500">{errors.dni}</p>
                )}
              </FormField>
            </div>
          </div>

          {/* Notes field spans full width */}
          <FormField label="Notas">
            {/*
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-300 focus:border-slate-300"
              rows={4}
            /> */ }
             <RichTextEditor
              value={formData.notes}
              onChange={handleNotesChange}
              placeholder="Agregar notas acerca del cliente..."
            />
          </FormField>

          <FormActions 
            cancelPath="/clientes" 
            submitText={loading ? 'Creando...' : 'Crear Cliente'} 
          />
        </form>
      </div>
    </div>
  );
};

export default NewClientPage;