export const CLIENT_STATUS = {
    ACTIVO: 'activo',
    INACTIVO: 'inactivo',
    CERRADO: 'cerrado',
    PENDIENTE: 'pendiente',
    ENTRANSITO: 'en_transito',
    ACTIVOADM: 'activo_adm',
    ACTIVOJUD: 'activo_jud',
  } as const;
  
  export const CLIENT_STATUS_LABELS = {
    [CLIENT_STATUS.ACTIVO]: 'Activo',
    [CLIENT_STATUS.INACTIVO]: 'Inactivo',
    [CLIENT_STATUS.CERRADO]: 'Cerrado',
    [CLIENT_STATUS.PENDIENTE]: 'Pendiente',
    [CLIENT_STATUS.ENTRANSITO]: 'En tránsito',
    [CLIENT_STATUS.ACTIVOADM]: 'Activo Administrativo',
    [CLIENT_STATUS.ACTIVOJUD]: 'Activo Judicial',
  } as const;
