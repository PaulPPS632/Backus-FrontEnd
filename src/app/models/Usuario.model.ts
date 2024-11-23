export interface Usuario {
  id: number;
  username: string;
  name: string;
  adress: string;
  phone: string;
  document: string;
  isvalid: boolean;
  rol: Rol;
}
export interface Rol {
  id: number;
  nombre: string;
  descripcion: string;
  privilegios: any;
}
