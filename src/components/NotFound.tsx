import { Home, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 lg:pb-36 lg:pt-48 pt-32 pb-16">
        <div className="max-w-lg w-full text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-zinc-100 rounded-full mb-6">
              <picture>
                <source srcSet="/images/logo-140.webp" media="(min-width: 768px)" />
                <img
                  src="/images/logo-70.webp"
                  alt="abogado penalista"
                  className="w-10 h-10 md:w-12 md:h-12 text-white drop-shadow-lg"
                  loading="lazy"
                />
              </picture>
            </div>
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Página No Encontrada
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Lo sentimos, la página que está buscando no existe o ha sido movida.
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => navigate('/')}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-900 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <Home className="h-5 w-5 mr-2" />
              Volver al Inicio
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">¿Necesita ayuda legal?</p>
              <button
                onClick={() => navigate('/#contacto')}
                className="inline-flex items-center text-blue-900 hover:text-blue-700 font-medium"
              >
                <Phone className="h-4 w-4 mr-1" />
                Contáctanos
              </button>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">Páginas más visitadas:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <button
                onClick={() => navigate('/#servicios')}
                className="text-blue-900 hover:text-blue-700 hover:underline"
              >
                Nuestros Servicios
              </button>
              <button
                onClick={() => navigate('/#equipo')}
                className="text-blue-900 hover:text-blue-700 hover:underline"
              >
                Nuestro Equipo
              </button>
              <button
                onClick={() => navigate('/login')}
                className="text-indigo-600 hover:text-indigo-500 hover:underline"
              >
                Iniciar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
