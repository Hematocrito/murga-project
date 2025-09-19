import { useState } from 'react';
import { ClientFormData } from '../types/Cliente';
import { formatDNI, isValidDNI, isValidEmail } from '../utils/validation';

interface FileAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  data: string;
}

const initialFormData: ClientFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  state: '',
  notes: '',
  avatar: '',
  dni: '',
};

const useClientForm = () => {
  const [formData, setFormData] = useState<ClientFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof ClientFormData, string>>>({});
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);

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
    } else if (name === 'email') {
      setFormData(prev => ({ ...prev, [name]: value }));
      
      if (value && !isValidEmail(value)) {
        setErrors(prev => ({ ...prev, email: 'Ingrese una dirección de correo electrónico válida' }));
      } else {
        setErrors(prev => ({ ...prev, email: undefined }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAvatarChange = (avatarUrl: string) => {
    setFormData(prev => ({
      ...prev,
      avatar: avatarUrl,
    }));
  };

  const handleNotesChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      notes: value,
    }));
  };

  const handleAttachmentsChange = (files: FileAttachment[]) => {
    setAttachments(files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidDNI(formData.dni)) {
      setErrors(prev => ({ ...prev, dni: 'DNI debe tener 8 digitos' }));
      return;
    }

    if (!isValidEmail(formData.email)) {
      setErrors(prev => ({ ...prev, email: 'Ingrese una dirección de correo electrónico válida' }));
      return;
    }
    
    console.log('Form submitted@@@@@@@@@@@:', formData);
  };

  return {
    formData,
    errors,
    handleChange,
    handleAvatarChange,
    handleNotesChange,
    handleSubmit,
    setFormData,
    attachments,
    handleAttachmentsChange,
    setAttachments,
  };
};

export default useClientForm;