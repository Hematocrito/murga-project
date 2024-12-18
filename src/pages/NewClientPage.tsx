import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import FormField from '../components/forms/FormField';
import FormActions from '../components/forms/FormActions';
import AvatarUpload from '../components/forms/AvatarUpload';
import useClientForm from '../hooks/useClientForm';

const NewClientPage = () => {
  const navigate = useNavigate();
  const { formData, handleChange, handleAvatarChange, handleSubmit } = useClientForm();

  return (
    <div>
      <button
        onClick={() => navigate('/clientes')}
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Volver a Clientes
      </button>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">New Client</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <AvatarUpload onChange={handleAvatarChange} />
          
          {/* Grid container with responsive columns */}
          <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
            {/* Left Column */}
            <div className="space-y-4">
              <FormField
                label="First Name"
                required
              >
                <input
                  type="text"
                  name="firstName"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </FormField>

              <FormField
                label="Company"
                required
              >
                <input
                  type="text"
                  name="company"
                  value={formData.empresa}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </FormField>

              <FormField
                label="State"
                required
              >
                <select
                  name="state"
                  value={formData.estado}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a state</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </FormField>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <FormField
                label="Last Name"
                required
              >
                <input
                  type="text"
                  name="lastName"
                  value={formData.apellido}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </FormField>

              <FormField
                label="Phone"
              >
                <input
                  type="tel"
                  name="phone"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </FormField>

            </div>
          </div>

          {/* Notes field spans full width */}
          <FormField label="Notes">
            <textarea
              name="notes"
              value={formData.notas}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
            />
          </FormField>

          <FormActions
            cancelPath="/clients"
            submitText="Create Client"
          />
        </form>
      </div>
    </div>
  );
};

export default NewClientPage;