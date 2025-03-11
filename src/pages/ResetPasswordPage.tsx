import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { KeyRound, AlertCircle, ArrowLeft } from 'lucide-react';
import { useMutation } from '@apollo/client';
import { RESET_PASSWORD } from '../graphql/mutations/auth';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [requestReset, { loading }] = useMutation(RESET_PASSWORD, {
    onError: (error) => {
      console.error('Reset password error:', error);
      setError('Error requesting password reset. Please try again.');
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const { data } = await requestReset({
        variables: {
          input: { email }
        }
      });

      if (data?.resetPassword) {
        setSuccess(true);
      }
    } catch (err) {
      setError('Error requesting password reset. Please try again.');
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="text-center">
            <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
              Revise su correo electrónico o spam para obtener instrucciones para restablecer la contraseña.
            </div>
            <Link
              to="/login"
              className="text-blue-800 hover:text-blue-950 font-medium"
            >
              Volver al inicio de sesión
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <button
          onClick={() => navigate('/login')}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver al inicio de sesión
        </button>

        <div className="flex items-center justify-center mb-8">
          <KeyRound className="w-8 h-8 text-blue-800" />
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-4">
          Recuperar contraseña
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Ingrese su dirección de correo electrónico y le enviaremos instrucciones para restablecer su contraseña.
        </p>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-6 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dirección de correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:border-black focus:ring-0 focus:outline-none"
              placeholder="Ingrese su correo electrónico"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Enviando...' : 'Enviar instrucciones'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;