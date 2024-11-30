//import React from 'react';
import { Scale, Shield, Users, Building2 } from 'lucide-react';

export default function Features() {
  const features = [
    {
      name: 'Derecho Corporativo',
      description: 'Asesoramiento integral para empresas y startups en todas las etapas de su desarrollo.',
      icon: Building2,
    },
    {
      name: 'Derecho Civil',
      description: 'Representación experta en casos civiles, contratos y resolución de conflictos.',
      icon: Scale,
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

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.name} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative px-6 py-8 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                <div className="space-y-6">
                  <feature.icon className="h-8 w-8 text-sky-800" />
                  <h3 className="text-lg font-semibold text-gray-900">{feature.name}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}