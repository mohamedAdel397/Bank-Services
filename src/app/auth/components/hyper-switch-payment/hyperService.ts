import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private YOUR_PUBLISHABLE_KEY = 'pk_snd_31b7a49878194713851c6258b6a6bc1c ';
  private API_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  async initialize(): Promise<void> {
    try {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const body = { items: [{ id: 'xl-tshirt' }], country: 'US' };

      const response = await this.http.post<{ clientSecret: string }>(`${this.API_URL}/hyperswitch-payment/create`, body, { headers }).toPromise();

      if (!response || !response.clientSecret) {
        throw new Error('Invalid response from the server');
      }

      const { clientSecret } = response;

      const appearance = {
        theme: 'midnight',
      };

      const hyper = (window as any).Hyper(this.YOUR_PUBLISHABLE_KEY);
      const widgets = hyper.widgets({ appearance, clientSecret });

      const unifiedCheckoutOptions = {
        wallets: {
          walletReturnUrl: 'https://example.com/complete',
          // Mandatory parameter for Wallet Flows such as Googlepay, Paypal, and Applepay
        },
      };

      const unifiedCheckout = widgets.create('payment', unifiedCheckoutOptions);
      unifiedCheckout.mount('#unified-checkout');
    } catch (error) {
      console.error('Error initializing payment:', error);
    }
  }

}
