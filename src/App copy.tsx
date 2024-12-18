import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider, useAuth } from './context/AuthContext';
//import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Clientes from './pages/Clientes';
import Expedientes from './pages/Expedientes';
import { HomePage } from './pages/HomePage';
import { ClientDetail } from './components/ClientDetail';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/home" />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>          
          <Route path="/login" element={<LoginPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route path="clientes" element={<Clientes />} />
            <Route path="/client/:id" element={<ClientDetail />} />
            <Route path="expedientes" element={<Expedientes />} />
            <Route index element={<Navigate to="/clientes" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;