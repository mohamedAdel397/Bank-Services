import {Component, OnInit} from '@angular/core';
import {StripeService} from "../../../services/services/stripe.service";
import {loadStripe, Stripe} from "@stripe/stripe-js";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.scss']
})
export class StripeComponent implements OnInit {

  stripe: Stripe | null = null;
  elements: any;
  secret :any ;
  clientSecret: string | null | undefined ;
  items = [{ id: 'xl-tshirt' }];

  async ngOnInit() {
    this.stripe = await loadStripe('pk_test_51POGyFP9oMnfmwHfi3F6rRMGe2u9nWYpUGlDTB12NTM3AtiqiGaTPL0tbAQ0z8j2DOt5hNQo1AiNSrnLvBG1vACY00ZSNAp7jQ');
    this.initializePayment();
  }

  constructor(private stripeService: StripeService,
              private toastr: ToastrService) {}

  async initializePayment() {
    try {
      debugger
      const response: any = await this.stripeService.createPaymentIntent(this.items).toPromise();
      if (response && response.client_secret) {
        this.clientSecret = response.client_secret;
        const appearance = { theme: 'stripe' };
        // @ts-ignore
        this.elements = this.stripe?.elements({ appearance, clientSecret: this.clientSecret });
        if (this.elements) {
          const paymentElementOptions = { layout: 'tabs' };
          const paymentElement = this.elements.create('payment', paymentElementOptions);
          paymentElement.mount('#payment-element');
        } else {
          this.toastr.error('Failed to create Stripe elements.');
        }
      } else {
        this.toastr.error('Client secret not found in response:', response);
      }
    } catch (error) {
      this.toastr.error('Error initializing payment: ' + error);
    }
  }

  async handleSubmit(event: Event) {
    event.preventDefault();

    const { error } = await this.stripe!.confirmPayment({
      elements: this.elements,
      confirmParams: {
        return_url: 'http://localhost:4200/complete',
      },
    });

    if (error) {
      this.showMessage("NOT ERROR");
    } else {
      this.showMessage('An unexpected error occurred.');
    }
  }


  showMessage(messageText: string) {
    const messageContainer = document.querySelector('#payment-message');
    if (messageContainer) {
      messageContainer.classList.remove('hidden');
      messageContainer.textContent = messageText;

      setTimeout(() => {
        messageContainer.classList.add('hidden');
        messageContainer.textContent = '';
      }, 4000);
    }
  }

}
