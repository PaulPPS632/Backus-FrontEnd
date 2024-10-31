import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  constructor(private http: HttpClient) {}

  apiUrl: string = environment.API_URL + '/categoria';
  headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  });
  getAll(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }
  create(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, data, {
      headers: this.headers,
    });
  }
}
