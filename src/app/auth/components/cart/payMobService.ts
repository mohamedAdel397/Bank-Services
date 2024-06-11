import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayMobService {
  private apiUrl = 'http://localhost:8080/paymob-payment/create';
  private unifiedCheckoutUrl = 'https://accept.paymob.com/unifiedcheckout/';
  private publicKey = 'egy_pk_test_oEgxayD5YrOx5IbWpnfZ1c6B1dtBp8FD';

  constructor(private http: HttpClient) { }

  callPaymob(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.apiUrl, data, { headers });
  }

  createPayment(): Observable<any> {

    const paymentData = {
      "amount": 10,
      "currency": "EGP",
      "payment_methods": [
        12,
        "card",
        4593382
      ],
      "items": [
        {
          "name": "Item name 1",
          "amount": 10,
          "description": "Watch",
          "quantity": 1
        }
      ],
      "billing_data": {
        "apartment": "6",
        "first_name": "Ammar",
        "last_name": "Sadek",
        "street": "938, Al-Jadeed Bldg",
        "building": "939",
        "phone_number": "+96824480228",
        "country": "OMN",
        "email": "AmmarSadek@gmail.com",
        "floor": "1",
        "state": "Alkhuwair"
      },
      "customer": {
        "first_name": "Ammar",
        "last_name": "Sadek",
        "email": "AmmarSadek@gmail.com",
        "extras": {
          "re": "22"
        }
      },
      "extras": {
        "ee": 22
      }
    };

    return this.callPaymob(paymentData);
  }

  getUnifiedCheckoutUrl(clientSecret: string): string {
    return `${this.unifiedCheckoutUrl}?publicKey=${this.publicKey}&clientSecret=${clientSecret}`;
  }
}
