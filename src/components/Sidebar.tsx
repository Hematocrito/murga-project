//import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, FileText, X } from 'lucide-react';
import UserMenu from './auth/UserMenu';

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  //const { logout } = useAuth();

  return (
    <div className="flex flex-col h-full bg-gray-800 text-white w-64">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-xl font-bold">Estudio Jurídico</h1>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      
      <nav className="flex-1">
      <NavLink
          to="/clientes"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 hover:bg-gray-700 ${
              isActive ? 'bg-gray-700' : ''
            }`
          }
          onClick={onClose}
        >
          <Users className="h-5 w-5 mr-3" />
          Clientes
        </NavLink>

        <NavLink
          to="/expedientes"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 hover:bg-gray-700 ${
              isActive ? 'bg-gray-700' : ''
            }`
          }
          onClick={onClose}
        >
          <FileText size={20} className='mr-3' />
          Expedientes
        </NavLink>  
      </nav>

      <UserMenu />    
      
    </div>
  );
};