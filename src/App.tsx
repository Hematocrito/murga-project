import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
//import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import Layout from './components/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';
import NewClientPage from './pages/NewClientPage';
import ClientsPage from './pages/ClientsPage';
import ClientDetailsPage from './pages/ClientDetailsPage';
import Expedientes from './pages/Expedientes';
import EditClientPage from './pages/EditClientPage';
import AdminDashboardPage from './pages/AdminDashboardPage';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>          
          <Route path="/login" element={<LoginPage />} />
          <Route path='/' element={<HomePage />} />
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboardPage />
                </AdminRoute>
              }
            />
            <Route path="/clientes" element={<ClientsPage />} />
            <Route path="/clientes/:id" element={<ClientDetailsPage />} />
            <Route path="/clientes/nuevo" element={<NewClientPage />} /> 
            <Route path="/clientes/:id/editar" element={<EditClientPage />} />
            <Route path="expedientes" element={<Expedientes />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;