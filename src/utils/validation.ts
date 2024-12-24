export const isValidDNI = (dni: string): boolean => {
  // Remove any non-digit characters
  const dniNumbers = dni.replace(/\D/g, '');
  // Check if it contains only numbers and has a valid length (8 digits)
  return /^\d{8}$/.test(dniNumbers);
};

export const formatDNI = (dni: string): string => {
  // Remove any non-digit characters and limit to 8 digits
  return dni.replace(/\D/g, '').slice(0, 8);
};