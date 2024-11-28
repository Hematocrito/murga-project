import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { HttpLink } from '@apollo/client';


//Leer el storage almacenado
const token = localStorage.getItem('token');
const httpLink = {
  //uri: 'http://localhost:4000/',
  uri: 'https://vast-hollows-51774-ff90a6c856e2.herokuapp.com/',
  headers: {
    authorization: `Bearer ${token}`
  }
}

const client = new ApolloClient({
  link: new HttpLink(httpLink),
  cache: new InMemoryCache()
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
