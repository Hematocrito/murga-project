import { gql } from '@apollo/client';

export const AUTENTICAR_USUARIO = gql`
  mutation AutenticarUsuario($input: AutenticarInput) {
    autenticarUsuario(input: $input) {
      token
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetPassword($input: EmailInput) {
    resetPassword(input: $input)
  }
`;