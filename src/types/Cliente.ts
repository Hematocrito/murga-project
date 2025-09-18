export interface Cliente {
  id: string;
  nombre: string;
  apellido: string;
  avatar: string;
  empresa: string;
  email: string;
  telefono: string;
  estado: string;
  dni?: string;
  notas?: string;
}

export interface FileAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  data: string; // base64
}

export interface ClientFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  state: string;
  notes: string;
  avatar: string;
  dni: string;
  attachments: FileAttachment[];
}
