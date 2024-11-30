//import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-white pt-16">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80"
          alt="Law office"
        />
        <div className="absolute inset-0 bg-gray-900/70 mix-blend-multiply" />
      </div>
      
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Experiencia y Excelencia Legal
        </h1>
        <p className="mt-6 max-w-3xl text-xl text-gray-300">
          Protegemos sus derechos y defendemos sus intereses con un equipo de abogados expertos comprometidos con la excelencia y la integridad profesional.
        </p>
        <div className="mt-10 flex gap-x-6">
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-900 hover:bg-blue-700">
            Consulta Gratuita
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-gray-200 bg-gray-900 bg-opacity-40 hover:bg-opacity-50">
            Conocer Más
          </button>
        </div>
      </div>
    </div>
  );
}