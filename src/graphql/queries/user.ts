import { gql } from '@apollo/client';

export const OBTENER_USUARIO = gql`
  query ObtenerUsuario {
    obtenerUsuario {
      nombre
      apellido
      email
      rol
    }
  }
`;