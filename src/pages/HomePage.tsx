import React, { lazy } from 'react';
//import { Navigate } from 'react-router-dom';
//import { useAuth } from '../contexts/AuthContext';

const Navbar = lazy(() => import('../components/Navbar'));
const Hero = lazy(() => import('../components/Hero'));
const Features = lazy(() => import('../components/Features'));
const Team = lazy(() => import('../components/Team'));
const Footer = lazy(() => import('../components/Footer'));

export const HomePage: React.FC = () => {
  

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