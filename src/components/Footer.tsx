//import React from 'react';
import { Scale, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900" id="contacto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center">
              <Scale className="h-8 w-8 text-sky-500" />
              <span className="ml-2 text-xl font-semibold text-white">Murga & Asociados</span>
            </div>
            <p className="mt-4 text-gray-400">
              Comprometidos con la excelencia legal y la satisfacción de nuestros clientes.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Contacto</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-sky-500" />
                <span className="ml-3 text-gray-300">murgayasoc@gmail.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-sky-500" />
                <span className="ml-3 text-gray-300">+54 351 754-7452</span>
              </div>
              <span className="ml-8 text-gray-300">+54 351 766-0672</span>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-sky-500" />
                <span className="ml-3 text-gray-300">Justo José de Urquiza 174, Cba</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Horario</h3>
            <div className="mt-4 space-y-2">
              <p className="text-gray-300">Lunes a Viernes</p>
              <p className="text-gray-400">8:00 - 17:00</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-800 pt-8">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} Murga & Asociados. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}