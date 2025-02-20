import { mockClients } from './mockClients';

export const mockUsers = [
  {
    id: '1',
    name: 'John Admin',
    email: 'admin@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    rol: 'admin',
    clients: mockClients.slice(0, 2)
  },
  {
    id: '2',
    name: 'Sarah Manager',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    rol: 'user',
    clients: mockClients.slice(2)
  }
];