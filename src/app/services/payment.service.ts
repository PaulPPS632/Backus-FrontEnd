import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}
  private apiUrl = environment.API_URL;
  postExternalData(paymentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/payment/external-data`, paymentData);
  }
  validatePayment(paymentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/payment/validate`, paymentData);
  }
}
