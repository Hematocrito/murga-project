import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
//import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import Layout from './components/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NewClientPage from './pages/NewClientPage';
import ClientsPage from './pages/ClientsPage';


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
            <Route path="/clientes" element={<ClientsPage />} />
            
            <Route path="/clientes/nuevo" element={<NewClientPage />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;