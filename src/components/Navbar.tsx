/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Scale, LogIn, UserPlus } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import RegisterModal from './RegisterModal';


export default function Navbar() {

  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Scale className="h-8 w-8 text-sky-800" />
              <span className="ml-2 text-xl font-semibold text-gray-900">Lexium & Asociados</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <a href="#servicios" className="text-gray-700 hover:text-indigo-600 px-3 py-2">Servicios</a>
              <a href="#equipo" className="text-gray-700 hover:text-indigo-600 px-3 py-2">Equipo</a>
              <a href="#contacto" className="text-gray-700 hover:text-indigo-600 px-3 py-2">Contacto</a>
              
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-900 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Iniciar Sesión
              </Link>
              
              <button 
                onClick={() => setIsRegisterOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Registrarse
              </button>
            </div>
          </div>
        </div>
      </nav>

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </>
  );
}