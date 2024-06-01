import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentRequest } from './bank-credit.component'; // Adjust the import path as necessary

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:8080/payments/process';

  constructor(private http: HttpClient) {}

  processPayment(paymentRequest: PaymentRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl, paymentRequest);
  }
}
