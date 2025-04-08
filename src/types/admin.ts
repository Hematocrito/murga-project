export interface AdminClient {
  id: string;
  dni: string;
  nombre: string;
  apellido: string;
  estado?: string;
  lawyer?: string;
  avatar?: string;
}
  
export interface UserWithClients {
  nombre: string;
  apellido: string;
  clientes: AdminClient[];
}