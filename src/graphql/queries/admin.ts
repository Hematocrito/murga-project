import { gql } from '@apollo/client';

export const OBTENER_CLIENTES_X_USUARIO = gql`
  query obtenerClientesxUsuario {
    obtenerClientesxUsuario {
      nombre
      apellido
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