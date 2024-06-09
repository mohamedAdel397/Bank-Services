import { Component, OnInit } from '@angular/core';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
import {PaymentService} from "../../../services/payment-service.service";
@Component({
  selector: 'app-stripe-payment',
  templateUrl: './stripe-payment.component.html',
  styleUrls: ['./stripe-payment.component.scss']
})
export class StripePaymentComponent implements OnInit {
  stripe: Stripe | null = null;
  clientSecret: string | null = null;
  elements: StripeElements | null = null;

  constructor(private paymentService: PaymentService) {}

  async ngOnInit() {
    this.stripe = await loadStripe('pk_test_51POKmJCkQ6Bam1ZLykXQYCagr6PzH1wlCO4yGfuYqzhsLoNs8g8rleBkZINwBlnXGb5o1k71KiYcGSC7Ne7thvW000eU6WOG9x');

    if (this.stripe) {
      this.paymentService.createPaymentIntent(1099).subscribe(data => {
        this.clientSecret = data.clientSecret !== undefined ? data.clientSecret : null; // Ensure clientSecret is null if undefined
        if (this.clientSecret) {
          this.initializeStripe(this.clientSecret);
        }
      });
    }
  }

  initializeStripe(clientSecret: string) {
    if (this.stripe) {
      this.elements = this.stripe.elements({ clientSecret });
      const paymentElement = this.elements.create('payment');
      paymentElement.mount('#payment-element');

      const form = document.getElementById('payment-form') as HTMLFormElement | null;
      if (form) {
        form.addEventListener('submit', async (event) => {
          event.preventDefault();
          if (this.stripe && this.elements) {
            const { error } = await this.stripe.confirmPayment({
              elements: this.elements,
              confirmParams: {
                return_url: 'https://example.com/order/123/complete',
              },
            });

            const messageContainer = document.querySelector('#error-message') as HTMLDivElement | null;
            if (messageContainer) {
              messageContainer.textContent = error ? error.message ?? 'An error occurred.' : '';
            }

          }
        });
      }
    }
  }
}
