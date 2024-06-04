import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PaymobIframeService {

  private readonly API = 'ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T1RjNU9ESTNMQ0p1WVcxbElqb2lhVzVwZEdsaGJDSjkueW8wNnljbm1lYkt2VmMzT0xmeU1hR3FOV05tdUFBbUpZWUoxaGEyUE8tZ0R6NEQyaHFlZ1dSaUxUSjBsVW1ybGxXaFY4VVJmdkdNV2x0YWZlUVJJZVE=';  // Your API key here

  private readonly integrationID = 4590381;

  constructor(private http: HttpClient) {}

  async firstStep() {
    const data = {
      api_key: this.API
    };

    const response: any = await this.http.post('https://accept.paymob.com/api/auth/tokens', data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).toPromise();

    const token = response.token;
    this.secondStep(token);
  }


  async secondStep(token: string) {
    const data = {
      auth_token: token,
      delivery_needed: 'false',
      amount_cents: '100',
      currency: 'EGP',
      items: [],
    };

    const response: any = await this.http.post('https://accept.paymob.com/api/ecommerce/orders', data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).toPromise();

    const id = response.id;
    this.thirdStep(token, id);
  }


  async thirdStep(token: string, id: number) {
    const data = {
      auth_token: token,
      amount_cents: '100',
      expiration: 3600,
      order_id: id,
      billing_data: {
        apartment: '803',
        email: 'claudette09@exa.com',
        floor: '42',
        first_name: 'Clifford',
        street: 'Ethan Land',
        building: '8028',
        phone_number: '+86(8)9135210487',
        shipping_method: 'PKG',
        postal_code: '01898',
        city: 'Jaskolskiburgh',
        country: 'CR',
        last_name: 'Nicolas',
        state: 'Utah'
      },
      currency: 'EGP',
      integration_id: this.integrationID
    };

    const response: any = await this.http.post('https://accept.paymob.com/api/acceptance/payment_keys', data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).toPromise();

    const TheToken = response.token;
    this.cardPayment(TheToken);
  }

  cardPayment(token: string) {
    const iframeURL = `https://accept.paymob.com/api/acceptance/iframes/850271?payment_token=${token}`;
    window.location.href = iframeURL;
  }
}
