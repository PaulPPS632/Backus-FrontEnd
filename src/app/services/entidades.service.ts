import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EntidadesService {
  constructor(private http: HttpClient) {}

  apiUrl: string = environment.API_URL + '/usuario';
  headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  });
  getAll(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`, { headers: this.headers });
  }
  getByRol(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/rol/${id}`, {
      headers: this.headers,
    });
  }
}
