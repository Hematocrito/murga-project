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
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  rol: string;
  autorizado?: boolean;
  clientes: AdminClient[];
}
