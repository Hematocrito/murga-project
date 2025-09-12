//import React from 'react';
import { Scale, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

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
                <Mail className="h-5 w-5 text-sky-500" />
                <span className="ml-3 text-gray-300">murgayasoc@gmail.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-sky-500" />
                <a className="ml-3 text-gray-300" href="tel:+543517547452">+54 351 754-7452</a>
                <br />
                <br />
                <span className="ml-3 text-gray-300"></span>
              </div>
                <a className="ml-8 text-gray-300" href="tel:+543517660672">+54 351 766-0672</a>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-sky-500" />
                <span className="ml-3 text-gray-300">Justo José de Urquiza 174, Cordoba capital</span>
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
            © {new Date().getFullYear()} Lexium & Asociados. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}