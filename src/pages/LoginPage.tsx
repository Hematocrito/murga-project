import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { gql, useMutation } from "@apollo/client";

const AUTENTICAR_USUARIO = gql`
    mutation AutenticarUsuario($input: AutenticarInput) {
        autenticarUsuario(input: $input) {
            token
        }
    }
`;

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  //Mutation para crear nuevos usuarios en apollo
  //const [ autenticarUsuario ] = useMutation(AUTENTICAR_USUARIO);
  const [autenticarUsuario, { loading }] = useMutation(AUTENTICAR_USUARIO, {
    onError: (error) => {
      console.error('Authentication error:', error);
      setError('Invalid credentials. Please try again.');
    }
  });

  useEffect(() => {
    
    
  }, []);  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const { data } = await autenticarUsuario({
        variables: {
            input:{
                email: username,
                password                            
            }
        }
      });
      console.log('DATOS !!!! ', data);

      const { token } = data.autenticarUsuario;

      const usuario:any = await login(token);
            
      navigate(usuario.rol === 'admin' ? '/admin' : '/clientes', { replace: true });
      //navigate('/clientes', { replace: true });
      
    } catch (error) {
      console.log(error);
      setError('Credenciales inválidas');
    }    
    
  };

  return (
    <div className="min-h-screen bg-gray-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <img src='/images/logo.jpg' className="h-12 w-14" alt='murga estudio juridico' />
          <h1 className="text-2xl font-bold text-gray-900">Estudio Jurídico</h1>
          <p className="text-gray-600">Acceso al Sistema</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Usuario
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
            <div className="mt-2 text-right">
              <Link
                to="/reset-password"
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Olvidaste la contraseña?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-blue-600 hover:text-blue-700">
            Volver a la Pagina Principal
          </Link>
        </div>
      </div>
    </div>
  );
};