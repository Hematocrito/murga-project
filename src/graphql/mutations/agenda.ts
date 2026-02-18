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
