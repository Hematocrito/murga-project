//import React from 'react';

export default function Hero() {
  return (
    <div className="relative bg-white pt-16">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          //src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80"
          src="/images/hero.jpg"
          alt="estudio juridico"
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
          
          
        </div>
      </div>
    </div>
  );
}