import { gql } from '@apollo/client';

export const OBTENER_EVENTOS_AGENDA = gql`
  query ObtenerEventosAgenda($fecha: String!) {
    obtenerEventosAgenda(fecha: $fecha) {
      id
      title
      description
      date
      time
      location
      client
      type
      usuario
      usuarioNombre
    }
  }
`;

export const OBTENER_USUARIOS_AGENDA = gql`
  query ObtenerUsuariosAgenda {
    obtenerUsuariosAgenda {
      id
      nombre
      apellido
      email
    }
  }
`;
