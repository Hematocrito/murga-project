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
  //Datos a revisar
  address: string;
  city: string;
  country: string;
  //status: 'active' | 'inactive';
  joinDate: string;
  industry: string;
  revenue: string;
  employees: number;
  website: string;
}