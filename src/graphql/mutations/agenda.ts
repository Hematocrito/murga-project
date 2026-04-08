import { gql } from '@apollo/client';

export const CREAR_EVENTO_AGENDA = gql`
  mutation CrearEventoAgenda($input: AgendaEventInput!) {
    crearEventoAgenda(input: $input) {
      title
      description
      date
      time
      location
      client
      type
      submittedAt
    }
  }
`;

export const EDITAR_EVENTO_AGENDA = gql`
  mutation EditarEventoAgenda($id: ID!, $input: AgendaEventInput!) {
    editarEventoAgenda(id: $id, input: $input) {
      title
      description
      date
      time
      location
      client
      type
      submittedAt
    }
  }
`;

export const ELIMINAR_EVENTO_AGENDA = gql`
  mutation EliminarEventoAgenda($id: ID!) {
    eliminarEventoAgenda(id: $id)
  }
`;
