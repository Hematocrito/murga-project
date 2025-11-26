//import React from 'react';
import { Scale, Shield, Users, Briefcase, Car, Heart, Users2, Gavel } from 'lucide-react';

export default function Features() {
  const features = [
    {
      name: 'ART - Riesgos del Trabajo',
      description: 'Asesoramiento especializado en casos de accidentes laborales y enfermedades profesionales.',
      icon: Briefcase,
    },
    {
      name: 'Derecho Penal',
      description: 'Defensa penal especializada y asesoramiento en procesos criminales.',
      icon: Gavel,
    },
    {
      name: 'Derecho de Familia',
      description: 'Asesoramiento integral en divorcios, custodia, alimentos y asuntos familiares.',
      icon: Users2,
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
      name: 'Derecho de la Seg. Social',
      description: 'Asistencia en jubilaciones, pensiones y beneficios de la seguridad social.',
      icon: Heart,
    },
    {
      name: 'Accidentes de Tránsito',
      description: 'Representación legal en accidentes viales y reclamos de indemnización.',
      icon: Car,
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
          <h2 className="text-lg font-bold text-gray-900 md:text-xl">
            Nuestras Áreas de Práctica
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Ofrecemos servicios legales integrales con la más alta calidad profesional
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-10">
            {features.map((feature) => (
              <div 
              key={feature.name} 
              className="relative group"
            >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <div className="relative px-6 py-8 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                <div className="space-y-5">
                    <feature.icon className="h-8 w-8 text-blue-800" />
                    <h3 className="text-sm font-semibold text-gray-900">
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