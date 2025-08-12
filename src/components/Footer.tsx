//import React from 'react';
import { Scale, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900" id="contacto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center">
              <Scale className="h-8 w-8 text-indigo-500" />
              <span className="ml-2 text-xl font-semibold text-white">Lexium & Asociados</span>
            </div>
            <p className="mt-4 text-gray-400">
              Comprometidos con la excelencia legal y la satisfacción de nuestros clientes desde 1995.
            </p>
            <div className="mt-6 flex space-x-4">
              <a
                href="https://web.facebook.com/murgayasociados.estudiojuridico.9"
                className="text-gray-400 hover:text-indigo-500 transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-500 transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/murga.estudio.juridico?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                className="text-gray-400 hover:text-indigo-500 transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-500 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Contacto</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-indigo-500" />
                <span className="ml-3 text-gray-300">contacto@lexium.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-indigo-500" />
                <span className="ml-3 text-gray-300">+54 11 4444-5555</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-indigo-500" />
                <span className="ml-3 text-gray-300">Av. Libertador 1234, CABA</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Horario</h3>
            <div className="mt-4 space-y-2">
              <p className="text-gray-300">Lunes a Viernes</p>
              <p className="text-gray-400">9:00 - 18:00</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-800 pt-8">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} Lexium & Asociados. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}