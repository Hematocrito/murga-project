import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Team from '../components/Team';
import Footer from '../components/Footer';
//import { MessageCircle } from 'lucide-react';
//import { Navigate } from 'react-router-dom';
//import { useAuth } from '../contexts/AuthContext';

export const HomePage: React.FC = () => {
  
  const handleWhatsAppClick = () => {
    // Replace with your actual WhatsApp number
    const phoneNumber = '+5493517660672';
    //const message = 'hola, quiero hacer una consulta';
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    //const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Floating WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-8 right-8 bg-[#25D366] hover:bg-[#20ba57] w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 group z-50"
        aria-label="Contact us on WhatsApp"
      >
        { /* <MessageCircle className="w-8 h-8 text-white" /> */}
        <img src='/images/whatsapp.png' alt='whatsapp' />
        <span className="absolute right-full mr-4 bg-black text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Enviar mensaje
        </span>
      </button>

      <Navbar />
      <Hero />
      <Features />
      <Team />
      <Footer />
    </div>
  );
};

