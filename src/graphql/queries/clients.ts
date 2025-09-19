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

export const OBTENER_CLIENTE = gql`
  query obtenerCliente($id: ID!) {
    obtenerCliente(id: $id) {
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