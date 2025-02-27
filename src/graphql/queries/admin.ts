import { gql } from '@apollo/client';

export const OBTENER_CLIENTES_X_USUARIO = gql`
  query obtenerClientesxUsuario {
    obtenerClientesxUsuario {
      nombre
      apellido
      clientes {
        dni
        nombre
        apellido
      }
    }
  }
`;