import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido.model';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  constructor(private http: HttpClient) {}

  apiUrl: string = environment.API_URL + '/pedidos';
  headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  });
  getAll(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }
  getByUser(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${username}`);
  }
  registrar(data: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}`, data);
  }
  CambiarEstado(pedido: Pedido): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}`, pedido);
  }
}
