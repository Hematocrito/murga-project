import { useState } from 'react';
import { LogIn, UserPlus, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RegisterModal from './RegisterModal';


export default function Navbar() {
  const navigate = useNavigate();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLoginClick = () => {
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-white shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-18 items-center mt-2">
            <div className="flex items-center">
              <div className="flex flex-col">
              <div className="flex items-center">
                  <img src='/images/logo.jpg' className="h-10 w-12  " alt='abogado penalista' />
                  <span className="ml-2 text-sm md:text-xl font-semibold text-gray-900">Murga & Asociados</span>
                </div>
                <span className="text-sm text-gray-600 italic ml-2 mt-1 mb-2">Especialistas en defender tus derechos</span>
              </div>
            </div>
            
            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="#servicios" className="text-gray-700 hover:text-blue-800 px-3 py-2">Servicios</a>
              <a href="#equipo" className="text-gray-700 hover:text-blue-800 px-3 py-2">Equipo</a>
              <a href="#contacto" className="text-gray-700 hover:text-blue-800 px-3 py-2">Contacto</a>
              
              <button 
                onClick={handleLoginClick}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-800 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Iniciar Sesión
              </button>
              
              <button 
                onClick={() => setIsRegisterOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Registrarse
              </button>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-800"
              >
                <span className="sr-only">Abrir menú</span>
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="#servicios"
                className="block px-3 py-2 rounded-md text-base font-normal text-black hover:text-indigo-600 hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Servicios
              </a>
              <a
                href="#equipo"
                className="block px-3 py-2 rounded-md text-base font-normal text-black hover:text-indigo-600 hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Equipo
              </a>
              <a
                href="#contacto"
                className="block px-3 py-2 rounded-md text-base font-normal text-black hover:text-indigo-600 hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contacto
              </a>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-5 space-x-3">
                <button
                  onClick={handleLoginClick}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-blue-800 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  Iniciar Sesión
                </button>
              </div>
              <div className="mt-3 px-5">
                <button
                  onClick={() => {
                    setIsRegisterOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <UserPlus className="h-5 w-5 mr-2" />
                  Registrarse
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
      
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </>
  );
}