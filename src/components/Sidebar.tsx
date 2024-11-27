import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, FileText, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-center">Estudio Jurídico</h1>
      </div>
      
      <nav className="space-y-2">
        <NavLink
          to="/clientes"
          className={({ isActive }) =>
            `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              isActive ? 'bg-blue-600' : 'hover:bg-gray-800'
            }`
          }
        >
          <Users size={20} />
          <span>Clientes</span>
        </NavLink>

        <NavLink
          to="/expedientes"
          className={({ isActive }) =>
            `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              isActive ? 'bg-blue-600' : 'hover:bg-gray-800'
            }`
          }
        >
          <FileText size={20} />
          <span>Expedientes</span>
        </NavLink>
      </nav>

      <div className="absolute bottom-4 w-52">
        <button
          onClick={logout}
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 w-full"
        >
          <LogOut size={20} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;