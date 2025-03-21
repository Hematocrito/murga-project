export interface AdminClient {
    dni: string;
    nombre: string;
    apellido: string;
    estado: string;
  }
  
  export interface UserWithClients {
    nombre: string;
    apellido: string;
    clientes: AdminClient[];
  }