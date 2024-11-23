import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

  apiUrl: string = environment.API_URL + '/usuarios';
  headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  });
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
  getByUsername(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${username}`);
  }
  getSearch(search: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search?search=${search}`);
  }
  getPaged(page: number, pageSize: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/paged?page=${page}&pageSize=${pageSize}`
    );
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
