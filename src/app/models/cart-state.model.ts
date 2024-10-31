import { Curso } from './curso.model';

export interface CartState {
  cursos: Curso[];
  quantity: number;
  loaded: boolean;
}
