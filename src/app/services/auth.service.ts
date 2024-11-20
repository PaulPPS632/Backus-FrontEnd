import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = environment.API_URL + '/auth';

  public usuarioSubject = new BehaviorSubject<any | null>(null);
  public usuario$ = this.usuarioSubject.asObservable();

  public usuarioIDSubject = new BehaviorSubject<any | null>(null);
  public usuarioID$ = this.usuarioSubject.asObservable();

  constructor(private http: HttpClient) {
    this.cargarUsuario();
  }

  cargarUsuario() {
    const token = this.getToken();
    if (token) {
      this.isLoggedIn().subscribe((res) => {
        if (res.estado) {
          console.log('Cargarusuario', res);
          this.usuarioSubject.next(res.user);
          this.usuarioIDSubject.next(res.usuarioId);
        } else {
          this.logout();
        }
      });
    }
  }

  register(registerRequest: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, registerRequest).pipe(
      tap((response) => {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('rol', response.rol);
        localStorage.setItem('User', response.username);
      })
    );
  }
  create(registerRequest: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, registerRequest);
  }

  isLoggedIn(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return of({ estado: false, rol: '', user: null });
    }
    const request = { token };
    return this.http.post<any>(`${this.apiUrl}/validate`, request).pipe(
      map((res) => ({
        estado: res.estado,
        rol: res.rol,
        user: res.username,
        usuarioId: res.usuarioId,
      }))
    );
  }

  Logged(username: string, password: string): Observable<any> {
    const loginRequest = {
      username,
      password,
    };
    return this.http.post<any>(`${this.apiUrl}/login`, loginRequest).pipe(
      tap((response) => {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('rol', response.rol);
        localStorage.setItem('User', JSON.stringify(response.username));
        this.usuarioSubject.next(response.username);
      })
    );
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('rol');
    localStorage.removeItem('User');
    this.usuarioSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
  getRol(): string | null {
    return localStorage.getItem('rol');
  }
  getUsuario(): any | null {
    const user = localStorage.getItem('User');
    return user ? JSON.parse(user) : null;
  }
}
