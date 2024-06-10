import {Component, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-paymob-iframe',
  templateUrl: './paymob-iframe.component.html',
  styleUrls: ['./paymob-iframe.component.scss']
})
export class PaymobIframeComponent implements OnInit {

  private readonly API = 'ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T1RjNU9ESTJMQ0p1WVcxbElqb2lNVGN4T0RBeE1EVTFNaTR5TmpFMk5qRWlmUS5Xc250VGlfVkdIb1FIVmlIeGktdDlQb204a2xHcWVNa3Z3RmYzaTJORUkwZDVOQXBJQldBckpVN081NjNaQm5Rd2tmMS1tVDJwYTViM3FWUTdPdmZuUQ==';  // Your API key here

  private readonly integrationID = 4590380;

  paymentUrl: SafeResourceUrl | null = null;


  ngOnInit(): void {
    this.firstStep();
  }

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
  }

  async firstStep() {
    const data = {
      api_key: this.API
    };

    const response: any = await this.http.post('https://accept.paymob.com/api/auth/tokens', data, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
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
      headers: new HttpHeaders({'Content-Type': 'application/json'})
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
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }).toPromise();

    const TheToken = response.token;
    this.paymentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://accept.paymob.com/api/acceptance/iframes/850272?payment_token=${TheToken}`);
  }

}
