export interface Cliente {
  id: string;
  nombre: string;
  apellido: string;
  empresa: string;
  email: string;
  telefono: string;
  avatar: string;
  dni: string;  
  estado: string;
  notas: string;
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
}