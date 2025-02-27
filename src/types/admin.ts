export interface AdminClient {
    dni: string;
    nombre: string;
    apellido: string;
  }
  
  export interface UserWithClients {
    nombre: string;
    apellido: string;
    clientes: AdminClient[];
  }