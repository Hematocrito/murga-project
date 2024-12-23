export interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  empresa: string;
  email: string;
  telefono: string;
  estado: string;
  dni: string;
  notas: string;
  avatar: File | null;
}