//import React from 'react';

export default function Team() {
  const team = [
    {
      name: 'Dra. María González',
      role: 'Socia Fundadora',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400',
      speciality: 'Derecho Corporativo',
    },
    {
      name: 'Dr. Carlos Rodríguez',
      role: 'Socio Senior',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400',
      speciality: 'Derecho Civil',
    },
    {
      name: 'Dra. Ana Martínez',
      role: 'Asociada Senior',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400',
      speciality: 'Derecho Laboral',
    },
  ];

  return (
    <div className="bg-gray-50 py-24" id="equipo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Nuestro Equipo
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Profesionales comprometidos con la excelencia
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <div key={member.name} className="group relative">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  className="w-full h-96 object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  src={member.image}
                  alt={member.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 opacity-50 group-hover:opacity-70 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-sm text-gray-300">{member.role}</p>
                  <p className="mt-2 text-indigo-300">{member.speciality}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}