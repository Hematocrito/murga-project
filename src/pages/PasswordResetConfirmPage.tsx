import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { KeyRound, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { useMutation, gql } from '@apollo/client';

const CONFIRMAR_RESET_PASSWORD = gql`
   mutation updatePassword($input: PasswordInput) {
      updatePassword(input: $input)
   }
`;

const PasswordResetConfirmPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URL(window.location.href);
    const tokenParam = url.pathname.split('/').pop();
    console.log('TOKEN ', tokenParam);
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      setError('El token de restablecimiento no es válido o falta. Solicite un nuevo enlace para restablecer la contraseña.');
    }
  }, []);

  const [confirmReset, { loading }] = useMutation(CONFIRMAR_RESET_PASSWORD, {
    onError: (error) => {
      console.error('Error de confirmación de restablecimiento de contraseña:', error);
      setError('Error al restablecer la contraseña. Es posible que el enlace haya expirado o no sea válido.');
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    try {
      const { data } = await confirmReset({
        variables: {
          input: { 
            token,
            newPass: password
          }
        }
      });
      console.log('DATA ', data);

      if (data) {
        setSuccess(true);
      } else {
        setError('Error al restablecer la contraseña. Inténtalo de nuevo o solicita un nuevo enlace de restablecimiento.');
      }
    } catch (err) {
      setError('Error al restablecer la contraseña. Inténtalo de nuevo o solicita un nuevo enlace de restablecimiento.');
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Restablecimiento de Contraseña Exitoso</h2>
            <p className="text-gray-600 mb-6">
              Tu contraseña se ha restablecido correctamente. Ahora puedes iniciar sesión con tu nueva contraseña.
            </p>
            <Link
              to="/login"
              className="inline-block bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ir a Iniciar Sesión
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
          Volver a Iniciar Sesión
        </button>

        <div className="flex items-center justify-center mb-8">
          <KeyRound className="w-8 h-8 text-blue-800" />
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-4">
          Crear Nueva Contraseña
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Ingrese su nueva contraseña a continuación para completar el proceso de restablecimiento de contraseña.
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
              Nueva Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              minLength={6}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirmar Nueva Contraseña
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              minLength={6}
            />
          </div>
          <button
            type="submit"
            disabled={loading || !token}
            className="w-full bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Restableciendo...' : 'Restablecer Contraseña'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordResetConfirmPage;