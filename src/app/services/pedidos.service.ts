import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  constructor(private http: HttpClient) {}

  apiUrl: string = environment.API_URL + '/pedidos';
  headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  });
  getAll(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${username}`);
  }
  registrar(data: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}`, data);
  }
}
