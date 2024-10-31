export interface HomeCategoria {
  categoria: {
    id: string;
    nombre: string;
    descripcion: string;
    createdAt: string;
    updatedAt: string;
  };
  cursos: HomeCurso[]; // Asegúrate de que 'Curso' esté definido también
}

export interface HomeCurso {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  duracion: number;
  nivel: string;
  ImagenPortada: {
    nombre: string;
    url: string;
  };
  autor: {
    id: string;
    nombre: string;
  };
}
