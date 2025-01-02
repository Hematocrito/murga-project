import { CLIENT_STATUS } from '../constants/clientStatus';

export type StatusStyle = {
  bg: string;
  text: string;
  label: string;
};

export const getStatusStyle = (status: string): StatusStyle => {
  const normalizedStatus = status.toLowerCase();
  
  switch (normalizedStatus) {
    case CLIENT_STATUS.ACTIVO:
      return {
        bg: 'bg-green-100',
        text: 'text-green-800',
        label: 'Activo'
      };
    case CLIENT_STATUS.INACTIVO:
      return {
        bg: 'bg-gray-100',
        text: 'text-gray-800',
        label: 'Inactivo'
      };
    case CLIENT_STATUS.CERRADO:
      return {
        bg: 'bg-red-100',
        text: 'text-red-800',
        label: 'Cerrado'
      };
    case CLIENT_STATUS.PENDIENTE:
      return {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
        label: 'Pendiente'
      };
    default:
      return {
        bg: 'bg-gray-100',
        text: 'text-gray-800',
        label: status
      };
  }
};