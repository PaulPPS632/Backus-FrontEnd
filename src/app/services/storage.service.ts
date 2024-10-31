import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Curso } from '../models/curso.model';
import { CursosItemCart } from '../models/cursos-item-cart.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly STORAGE_KEY = 'cursos_cart';

  // Carga los cursos desde el almacenamiento
  loadCursos(): Observable<Curso[]> {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return of(data ? JSON.parse(data) : []);
    } catch (error) {
      return throwError(
        () => new Error('Error al cargar los cursos del almacenamiento.')
      );
    }
  }

  // Guarda los cursos en el almacenamiento
  saveCursos(cursos: Curso[]): void {
    try {
      const data = JSON.stringify(cursos);
      localStorage.setItem(this.STORAGE_KEY, data);
    } catch (error) {
      console.error('Error al guardar los cursos en el almacenamiento:', error);
      // Opcional: podrías implementar una notificación al usuario aquí
    }
  }
}
