import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Team from '../components/Team';
import Footer from '../components/Footer';
//import { Navigate } from 'react-router-dom';
//import { useAuth } from '../contexts/AuthContext';

export const LandingPage: React.FC = () => {
  

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <Team />
      <Footer />
    </div>
  );
};