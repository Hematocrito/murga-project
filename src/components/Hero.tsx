//import React from 'react';

export default function Hero() {
  return (
    <div className="relative bg-white pt-16">
      <div className="absolute inset-0">
        <picture>
          <source srcSet="/images/hero-1600.webp" media="(min-width: 1280px)" />
          <source srcSet="/images/hero-1200.webp" media="(min-width: 768px)" />
          <img
            className="w-full h-full object-cover"
            src="/images/hero-768.webp"
            alt="estudio juridico cordoba"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="absolute inset-0 bg-gray-900/70 mix-blend-multiply" />
      </div>
      
      <div className="relative max-w-7xl mx-auto py-20 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
          Experiencia y Excelencia Legal
        </h1>
        <p className="mt-6 max-w-3xl text-base md:text-lg text-gray-300">
          Protegemos sus derechos y defendemos sus intereses con un equipo de abogados expertos comprometidos con la excelencia y la integridad profesional.
        </p>
        <div className="mt-10 flex gap-x-6">
          
          
        </div>
      </div>
      {/* Logo in bottom right corner */}
      <div className="absolute bottom-8 right-6 md:right-16  z-10 bg-white/10 backdrop-blur-sm rounded-full p-2">
        <picture>
          <source srcSet="/images/logo-140.webp" media="(min-width: 768px)" />
          <img
            src="/images/logo-70.webp"
            alt='abogado penalista'
            className="w-10 h-10 md:w-12 md:h-12 text-white drop-shadow-lg"
            loading="lazy"
          />
        </picture>
      </div>
    </div>
  );
}
