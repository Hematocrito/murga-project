//import React from 'react';
import { Gavel, Shield, Users, Home, Briefcase } from 'lucide-react';

export default function Features() {
  const features = [
    {
      name: 'ART - Riesgos de Trabajo',
      description: 'Asesoramiento especializado en casos de accidentes laborales y enfermedades profesionales.',
      icon: Briefcase,
      featured: true,
    },
    {
      name: 'Derecho de Familia',
      description: 'Asesoramiento en asuntos de relaciones familiares y los derechos de sus miembros.',
      icon: Home,
    },
    {
      name: 'Derecho Penal',
      description: 'Representación experta en la defensa de personas acusadas de delitos y de víctimas de crímenes.',
      icon: Gavel,
    },
    {
      name: 'Derecho Laboral',
      description: 'Protección de derechos laborales y asesoramiento en relaciones empleador-empleado.',
      icon: Users,
    },
    {
      name: 'Protección Legal',
      description: 'Servicios legales preventivos y defensa de sus intereses en cualquier situación.',
      icon: Shield,
    },
  ];

  return (
    <div className="py-24 bg-white" id="servicios">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Nuestras Áreas de Práctica
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Ofrecemos servicios legales integrales con la más alta calidad profesional
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-10">
            {features.map((feature) => (
              <div 
                key={feature.name} 
                className={`relative group ${feature.featured ? 'lg:col-span-4 lg:max-w-lg lg:mx-auto lg:mb-4' : ''}`}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <div className="relative px-6 py-8 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                  <div className={`space-y-5 ${feature.featured ? 'lg:space-y-6' : ''}`}>
                    <feature.icon className={`${feature.featured ? 'h-9 w-9 lg:h-10 lg:w-10' : 'h-8 w-8'} text-blue-800`} />
                    <h3 className={`${feature.featured ? 'text-lg lg:text-xl' : 'text-lg'} font-semibold text-gray-900`}>
                      {feature.name}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}