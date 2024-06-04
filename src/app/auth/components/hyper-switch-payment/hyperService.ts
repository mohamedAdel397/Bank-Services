import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private YOUR_PUBLISHABLE_KEY = 'pk_snd_593c2b658ebd423d9d134bd2a4a29ada';
  private API_URL = 'http://localhost:8080';
  private hyper: any;
  private widgets: any;
  private clientSecret: any;
   showMessage(message: any) {

  }

   setLoading(b: boolean) {

  }

  constructor(private http: HttpClient) {}

  async initialize(): Promise<void> {
    try {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const body = { items: [{ id: 'xl-tshirt' }], country: 'US' };

      const response = await this.http.post<{ clientSecret: string }>(`${this.API_URL}/hyperswitch-payment/create`, body, { headers }).toPromise();
      console.log("HI")
      if (!response || !response.clientSecret) {
        throw new Error('Invalid response from the server');
      }

      const { clientSecret } = response;
      this.clientSecret = clientSecret;

      const appearance = {
        theme: 'midnight',
      };

      this.hyper = (window as any).Hyper(this.YOUR_PUBLISHABLE_KEY);
      this. widgets = this.hyper.widgets({ appearance, clientSecret });

      const unifiedCheckoutOptions = {
        wallets: {
          walletReturnUrl: 'https://example/complete',
          // Mandatory parameter for Wallet Flows such as Googlepay, Paypal, and Applepay
        },
      };

      const unifiedCheckout = this.widgets.create('payment', unifiedCheckoutOptions);
      unifiedCheckout.mount('#unified-checkout');
    } catch (error) {
      console.error('Error initializing payment:', error);
    }
  }

  async handleSubmit(e: Event): Promise<void> {

     this.checkStatus();
    e.preventDefault();
    this.setLoading(true);



    try {
      const { error } = await this.hyper.confirmPayment({
        widgets : this.widgets,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: "https://example.com/complete",
        },
      });

      // This point will only be reached if there is an immediate error occurring while confirming the payment. Otherwise, your customer will be redirected to your "return_url".

      // For some payment flows such as Sofort, iDEAL, your customer will be redirected to an intermediate page to complete authorization of the payment, and then redirected to the "return_url".

      if (error) {
        if (error.type === "validation_error") {
          this.showMessage(error.message);
          console.log(error.message);
        } else {
         this. showMessage("An unexpected error occurred.");
          console.log("An unexpected error occurred.");
        }
      }
    } catch (err) {
      this.showMessage("An unexpected error occurred.");
      console.log("An unexpected error occurred.");
    } finally {
      this. setLoading(false);
    }


  }
  async  checkStatus(): Promise<void> {
     console.log(this.clientSecret);

    // const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");

    if (!this.clientSecret) {
      return;
    }

    try {
      const  payment  = await this.hyper.retrievePaymentIntent(this.clientSecret);

      switch (payment.paymentIntent.status) {
        case "succeeded":
          this. showMessage("Payment succeeded!");
          console.log("Payment succeeded!");
          break;
        case "processing":
          this.showMessage("Your payment is processing.");
          console.log("Your payment is processing.");
          break;
        case "requires_payment_method":
          this.showMessage("Your payment was not successful, please try again.");
          console.log("Your payment was not successful, please try again.");
          break;
        default:
          this. showMessage("Something went wrong.");
          console.log("Something went wrong.");

          break;
      }
    } catch (err) {
      this. showMessage("An error occurred while retrieving the payment status.");
      this. showMessage("An error occurred while retrieving the payment status.");

    }
  }



}
