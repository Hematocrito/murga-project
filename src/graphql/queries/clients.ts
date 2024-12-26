import { gql } from '@apollo/client';

export const OBTENER_CLIENTES_USUARIO = gql`
  query obtenerClientesVendedor {
    obtenerClientesVendedor {
      id
      nombre
      apellido
      avatar
      empresa
      email
      telefono
      estado
    }
  }
`;