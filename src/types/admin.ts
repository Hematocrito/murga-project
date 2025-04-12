export interface AdminClient {
  id: string;
  nombre: string;
  apellido: string;  
  empresa: string;
  email: string;
  telefono: string;
  avatar?: string;
  dni?: string;
  estado?: string;
  lawyer?: string;
  notas?: string;
}
  
export interface UserWithClients {
  nombre: string;
  apellido: string;
  clientes: AdminClient[];
}