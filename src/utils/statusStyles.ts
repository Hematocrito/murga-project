import { CLIENT_STATUS, CLIENT_STATUS_LABELS } from '../constants/clientStatus';

export type StatusStyle = {
  bg: string;
  text: string;
  label: string;
};

export const getStatusStyle = (status: string): StatusStyle => {
  const STATUS_LABEL_MAP = CLIENT_STATUS_LABELS as Record<string, string>;
  const normalizedStatus = (status || '').trim().toLowerCase();
  const label = STATUS_LABEL_MAP[normalizedStatus] || status || STATUS_LABEL_MAP[CLIENT_STATUS.PENDIENTE];

  switch (normalizedStatus) {
    case CLIENT_STATUS.ACTIVO:
    case CLIENT_STATUS.ACTIVOADM:
    case CLIENT_STATUS.ACTIVOJUD:
      return {
        bg: 'bg-green-100',
        text: 'text-green-800',
        label
      };
    case CLIENT_STATUS.INACTIVO:
      return {
        bg: 'bg-gray-100',
        text: 'text-gray-800',
        label
      };
    case CLIENT_STATUS.CERRADO:
      return {
        bg: 'bg-red-100',
        text: 'text-red-800',
        label
      };
    case CLIENT_STATUS.PENDIENTE:
      return {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
        label
      };
    case CLIENT_STATUS.ENTRANSITO:
      return {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        label
      };
    default:
      return {
        bg: 'bg-gray-100',
        text: 'text-gray-800',
        label
      };
  }
};
