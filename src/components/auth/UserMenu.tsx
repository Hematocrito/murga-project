//import React from 'react';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="p-4 border-t border-gray-700">
      <div className="flex items-center space-x-3 mb-3">
        <div className="bg-gray-600 p-2 rounded-full">
          <User className="w-5 h-5 text-gray-300" />
        </div>
        <div className="text-sm">
          <div className="text-gray-200 font-medium">{user?.name}</div>
          <div className="text-gray-400 text-xs">{user?.email}</div>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="w-full flex items-center space-x-2 px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
      >
        <LogOut className="w-4 h-4" />
        <span>Sign Out</span>
      </button>
    </div>
  );
};

export default UserMenu;