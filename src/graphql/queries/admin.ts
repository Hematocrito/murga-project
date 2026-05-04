import { gql } from '@apollo/client';

export const OBTENER_CLIENTES_X_USUARIO = gql`
  query obtenerClientesxUsuario {
    obtenerClientesxUsuario {
      id
      nombre
      apellido
      email
      rol
      autorizado
      clientes {
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
  }
`;

export const AUTORIZAR_USUARIO = gql`
  mutation autorizarUsuario($id: ID!) {
    autorizarUsuario(id: $id) {
      id
      nombre
      apellido
      email
      rol
      autorizado
    }
  }
`;
