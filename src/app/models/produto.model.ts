export interface Producto {
  id: string;
  nombre: string;
  pn: string;
  descripcion: string;
  stock: number;
  precio: number;
  id_marca: number;
  id_categoria: number;
  garantia_cliente: number;
  garantia_total: number;
  imagen_principal: string;
  imageurl: string[];
  // Añade otros campos relevantes según tus necesidades
}
