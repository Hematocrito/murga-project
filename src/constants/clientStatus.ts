export const CLIENT_STATUS = {
    ACTIVO: 'activo',
    INACTIVO: 'inactivo',
    CERRADO: 'cerrado',
    PENDIENTE: 'pendiente',
  } as const;
  
  export const CLIENT_STATUS_LABELS = {
    [CLIENT_STATUS.ACTIVO]: 'Activo',
    [CLIENT_STATUS.INACTIVO]: 'Inactivo',
    [CLIENT_STATUS.CERRADO]: 'Cerrado',
    [CLIENT_STATUS.PENDIENTE]: 'Pendiente',
  } as const;