import { gql } from '@apollo/client';

export const OBTENER_CLIENTES_USUARIO = gql`
  query obtenerClientesVendedor {
    obtenerClientesVendedor {
      id
      nombre
      apellido
      empresa
      email
      telefono
      avatar
      dni
      estado
      notas
    }
  }
`;