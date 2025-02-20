import { Client } from '../types/client';

export const mockClients: Client[] = [
  {
    id: '1',
    nombre: 'John',
    apellido: 'Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    empresa: 'Tech Corp',
    email: 'john.doe@techcorp.com',
    telefono: '555-0123',
    estado: 'Closed',
    notas: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet lectus nec libero interdum condimentum non ut turpis. Morbi id laoreet lorem. Fusce et felis non lectus consequat malesuada eu malesuada ligula. Mauris lacinia elit vitae lorem consectetur, convallis hendrerit justo laoreet. Cras sagittis ultricies tortor, id fermentum quam sodales non. Aliquam molestie congue eros, id malesuada nibh commodo et. Curabitur dolor velit, eleifend id eros sodales, elementum congue sem. Quisque ornare, ex eget scelerisque pharetra, quam diam egestas est, ut lobortis metus sapien at risus. Aenean mattis dui eu elit elementum, in rutrum elit elementum. Duis ut neque id tortor feugiat sagittis. Phasellus id nunc dictum, tempus enim ac, cursus dolor.'
  },
  {
    id: '2',
    nombre: 'Sarah',
    apellido: 'Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    empresa: 'Design Studio',
    email: 'sarah.j@designstudio.com',
    telefono: '555-0124',
    estado: 'Active'
  },
  {
    id: '3',
    nombre: 'Michael',
    apellido: 'Chen',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    empresa: 'Innovation Labs',
    email: 'michael.c@innolabs.com',
    telefono: '555-0125',
    estado: 'Inactive'
  },
  {
    id: '4',
    nombre: 'Emma',
    apellido: 'Wilson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    empresa: 'Global Solutions',
    email: 'emma.w@globalsolutions.com',
    telefono: '555-0126',
    estado: 'Pending'
  }
];