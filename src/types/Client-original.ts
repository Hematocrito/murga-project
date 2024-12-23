export interface Client {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  status: 'active' | 'inactive';
  joinDate: string;
  avatar: string;
  industry: string;
  revenue: string;
  employees: number;
  website: string;
  notes: string;
}