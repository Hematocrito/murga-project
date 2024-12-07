export interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  empresa: string;
  email: string;
  telefono: string;
  estado: 'activo' | 'inactivo';
  avatar: string;
}