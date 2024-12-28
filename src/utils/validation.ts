export const isValidDNI = (dni: string): boolean => {
  const dniNumbers = dni.replace(/\D/g, '');
  return /^\d{8}$/.test(dniNumbers);
};

export const formatDNI = (dni: string): string => {
  return dni.replace(/\D/g, '').slice(0, 8);
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};