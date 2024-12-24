import { useState } from 'react';
import { Cliente } from '../types/Cliente';
import { formatDNI, isValidDNI } from '../utils/validation';

const initialFormData: Cliente = {
  id: 0,
  nombre: '',
  apellido: '',
  email: '',
  telefono: '',
  empresa: '',
  estado: '',
  avatar: null,
  notas: '',
  dni: ''
};

export const useClientForm = () => {
  const [formData, setFormData] = useState<Cliente>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof Cliente, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'dni') {
      const formattedDNI = formatDNI(value);
      setFormData(prev => ({ ...prev, [name]: formattedDNI }));
      
      if (formattedDNI && !isValidDNI(formattedDNI)) {
        setErrors(prev => ({ ...prev, dni: 'DNI debe tener 8 digitos' }));
      } else {
        setErrors(prev => ({ ...prev, dni: undefined }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAvatarChange = (file: File | null) => {
    setFormData(prev => ({
      ...prev,
      avatar: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    
    // Create FormData for multipart/form-data submission (for file upload)
    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        submitData.append(key, value);
      }
    });
    
    // Add your API call here
    // await api.createClient(submitData);
  };

  return {
    formData,
    errors,
    handleChange,
    handleAvatarChange,
    handleSubmit,
  };
};

export default useClientForm;