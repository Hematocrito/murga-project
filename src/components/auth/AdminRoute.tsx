import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user || user.rol !== 'admin') {
    return <Navigate to="/clientes" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;