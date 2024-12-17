export interface Cliente {
    id: number;
    nombre: string;
    correo: string;
    celular: string;
    compras?: number;
    totalGastado?: number;
  }
  