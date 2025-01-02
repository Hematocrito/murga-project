import React from 'react';
import { getStatusStyle } from '../../utils/statusStyles';

interface ClientStatusBadgeProps {
  status: string;
}

const ClientStatusBadge: React.FC<ClientStatusBadgeProps> = ({ status }) => {
  const { bg, text, label } = getStatusStyle(status);

  return (
    <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${bg} ${text}`}>
      {label}
    </span>
  );
};

export default ClientStatusBadge;