import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Producto } from '../models/produto.model';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  constructor(private http: HttpClient) {}

  apiUrl: string = environment.API_URL + '/productos';
  headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  });
  /*
  getAll(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`, {
      headers: this.headers,
    });
  }*/
  getAll(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}`);
  }
  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  getPaged(page: number, pageSize: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/paged?page=${page}&pageSize=${pageSize}`
    );
  }
  getPaged2(queryParams: any): Observable<any[]> {
    let params = new HttpParams();

    // Añadir cada parámetro solo si tiene valor
    if (queryParams.page) params = params.set('page', queryParams.page);
    if (queryParams.size) params = params.set('size', queryParams.size);
    if (queryParams.search) params = params.set('search', queryParams.search);
    if (queryParams.sort) params = params.set('sort', queryParams.sort);
    if (queryParams.marca) params = params.set('marca', queryParams.marca);
    if (queryParams.categoria)
      params = params.set('categoria', queryParams.categoria);

    return this.http.get<any[]>(this.apiUrl + '/paged', { params });
  }
  create(data: FormData): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}`,
      data
      //   {
      //   headers: this.headers,
      // }
    );
  }
  update(data: FormData): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}`,
      data
      //   {
      //   headers: this.headers,
      // }
    );
  }
  getCoursesHome(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/home`);
  }
  getPorCategoria(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/categoria/${id}`);
  }
  getSearch(search: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/search/${search}`);
  }
  putProducto(data: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}`, data);
  }
  deleteProducto(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
