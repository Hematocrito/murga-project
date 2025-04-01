//import React from 'react';

export default function Team() {
  return (
    <div className="bg-gray-50 py-24" id="equipo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-lg font-bold text-gray-900 md:text-xl">
            Fundador y Guía Jurídico
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Liderando con experiencia y dedicación
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
          <div className="w-full lg:w-1/2">
            <div className="relative overflow-hidden rounded-lg shadow-xl">
              <img
                className="w-full h-[600px] object-cover object-center"
                src="/images/abogado.jpeg"
                alt="Marco Antonio Murga"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 opacity-30" />
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 space-y-6 mt-0 md:mt-14">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Dr. Marco Antonio Murga</h3>
              <p className="mt-2 text-base text-blue-900">Socio Fundador y Director</p>
            </div>
            
            <div className="prose prose-base text-gray-600 max-w-none">
              <p>
                Con años de experiencia en el campo legal, el Dr. Murga ha liderado casos emblemáticos que han marcado precedentes en múltiples áreas del derecho en Argentina.
              </p>
              
              <p className="mt-4">
                Su amplia experiencia abarca desde el derecho penal y laboral hasta asuntos civiles y familiares, brindando un servicio integral y personalizado a cada cliente.
              </p>
              
              <p className="mt-4">
                Su compromiso con la justicia y la defensa de los derechos de sus clientes lo ha llevado a ser reconocido como uno de los abogados más respetados en el ámbito jurídico, siendo frecuentemente consultado por medios especializados y participando como orador en importantes conferencias del sector.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900">Especialidades:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-900 rounded-full mr-3"></span>
                    Derecho Penal
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-900 rounded-full mr-3"></span>
                    ART - Riesgos del Trabajo
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-900 rounded-full mr-3"></span>
                    Derecho Laboral
                  </li>
                </ul>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-900 rounded-full mr-3"></span>
                    Derecho de Familia
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-900 rounded-full mr-3"></span>
                    Derecho Civil
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-900 rounded-full mr-3"></span>
                    Accidentes de Tránsito
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}