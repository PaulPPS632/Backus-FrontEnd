import { inject, Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { BehaviorSubject, map } from 'rxjs';
import { CartState } from '../models/cart-state.model';
import { Curso } from '../models/curso.model';

@Injectable({
  providedIn: 'root',
})
export class CartStateService {
  private _storageService = inject(StorageService);

  // BehaviorSubject para mantener el estado del carrito
  private cartState$ = new BehaviorSubject<CartState>({
    cursos: [],
    quantity: 0,
    loaded: false,
  });

  // Observable que expone el estado para su suscripción
  state$ = this.cartState$.asObservable();
  cursos$ = this.state$.pipe(map((state) => state.cursos));
  quantity$ = this.state$.pipe(map((state) => state.quantity));
  total$ = this.cursos$.pipe(
    map((cursos) =>
      cursos.reduce((total, curso) => total + curso.precio * curso.cantidad, 0)
    )
  );
  constructor() {
    // Cargar cursos desde el localStorage al inicializar el servicio
    this.loadCursos();
  }

  // Método para agregar un curso al carrito
  addCurso(newCurso: Curso): boolean {
    const currentState = this.cartState$.getValue();
    const cursoExistente = currentState.cursos.find(
      (curso) => curso.id === newCurso.id
    );

    if (cursoExistente) {
      cursoExistente.cantidad += 1;
    } else {
      newCurso.cantidad = 1;
      currentState.cursos.push(newCurso);
    }

    const updatedState: CartState = {
      ...currentState,
      cursos: [...currentState.cursos],
      quantity: currentState.cursos.reduce(
        (acc, curso) => acc + curso.cantidad,
        0
      ),
    };

    this.cartState$.next(updatedState);
    this._storageService.saveCursos(updatedState.cursos);

    return !cursoExistente;
  }

  // Método para eliminar un curso del carrito
  removeCurso(id: string) {
    const currentState = this.cartState$.getValue();
    const updatedCursos = currentState.cursos.filter(
      (curso) => curso.id !== id
    );

    const updatedState: CartState = {
      ...currentState,
      cursos: updatedCursos,
      quantity: updatedCursos.reduce((acc, curso) => acc + curso.cantidad, 0),
    };

    this.cartState$.next(updatedState);
    this._storageService.saveCursos(updatedCursos);
  }
  updateCursoCantidad(id: string, cantidad: number) {
    const currentState = this.cartState$.getValue();
    const curso = currentState.cursos.find((curso) => curso.id === id);

    if (curso && cantidad > 0) {
      curso.cantidad = cantidad;
    } else {
      this.removeCurso(id);
    }

    const updatedState: CartState = {
      ...currentState,
      cursos: [...currentState.cursos],
      quantity: currentState.cursos.reduce(
        (acc, curso) => acc + curso.cantidad,
        0
      ),
    };

    this.cartState$.next(updatedState);
    this._storageService.saveCursos(updatedState.cursos);
  }
  // Cargar los cursos guardados en localStorage
  private loadCursos() {
    this._storageService.loadCursos().subscribe((cursos: Curso[]) => {
      const currentState = this.cartState$.getValue();
      this.cartState$.next({
        ...currentState,
        cursos,
        quantity: cursos.reduce((acc, curso) => acc + curso.cantidad, 0),
        loaded: true,
      });
    });
  }
}
