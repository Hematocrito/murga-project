import { useState, lazy } from 'react';
import { LogIn, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const RegisterModal = lazy(() => import('./RegisterModal'));

export default function Navbar() {

  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto mb- px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <img src='/images/logo.jpg' className="h-12 w-14" alt='abogado' />
              <span className="ml-2 text-sm md:text-xl font-semibold text-gray-900">Murga & Asociados</span>
            </div>
            
            <div className="inline-flex">
              <div className='hidden md:flex'>
                <a href="#servicios" className="text-gray-700 hover:text-indigo-600 px-3 py-2">Servicios</a>
                <a href="#equipo" className="text-gray-700 hover:text-indigo-600 px-3 py-2">Equipo</a>
                <a href="#contacto" className="text-gray-700 hover:text-indigo-600 px-3 py-2">Contacto</a>
              </div>
              <div className='flex items-stretch'>
                <Link
                  to="/login"
                  //className="inline-flex px-4 py-2 border border-transparent text-xs md:text-sm font-medium rounded-md text-blue-900 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  className='w-28 md:w-32 text-xs md:text-base inline mt-3 md:mt-2 mx-0 md:mx-3 font-medium'
                >
                  <LogIn className="h-4 w-4 mr-2 inline" />
                  Iniciar Sesión
                </Link>
                
                <button 
                  onClick={() => setIsRegisterOpen(true)}
                  //className="inline-flex items-center px-2 py-2 border border-transparent text-xs md:text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:h-1"
                  className='text-xs md:text-base inline-flex text-white bg-blue-900 h-8 items-center mt-1 py-1 md:py-2 px-3 rounded-md hover:bg-blue-700 text-xs md:text-sm font-medium'
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Registrarse
                </button>
              </div>              
            </div>
          </div>
        </div>
        <p className='text-sm md:base italic ml-4 mb-2 -mt-1 md:ml-16 xl:ml-16 2xl:ml32'>Especialistas en defender tus derechos</p> 
      </nav>

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </>
  );
}