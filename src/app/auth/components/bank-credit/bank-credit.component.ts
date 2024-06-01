import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from "../cart/cartService"
import {PaymentService} from "./PaymentService";

@Component({
  selector: 'app-bank-credit',
  templateUrl: './bank-credit.component.html',
  styleUrls: ['./bank-credit.component.scss']
})
export class BankCreditComponent implements OnInit {
  selectedPaymentMethod: string = '';
  paymentRequest: PaymentRequest = new PaymentRequest();
  paypalEmail: string = '';

  constructor(
    private cartService: CartService,
    private router: Router,
    private paymentService: PaymentService
  ) {}

  completeCheckout(form: any) {
    if (form.valid) {
      let paymentInfo: any = {};

      if (this.selectedPaymentMethod === 'PayPal') {
        paymentInfo = { email: form.value.paypalEmail };
      } else if (this.selectedPaymentMethod === 'Visa' || this.selectedPaymentMethod === 'MasterCard') {
        paymentInfo = {
          cardNumber: this.paymentRequest.cardNumber,
          expiryDate: this.paymentRequest.expirationDate,
          cvv: this.paymentRequest.cvv
        };
      }

      this.paymentService.processPayment(this.paymentRequest).subscribe(
        response => {
          this.router.navigate(['/confirmation']);
          this.cartService.removeallFromCart();
        },
        error => {
          alert('Checkout failed. Please try again.');
          console.error('Error processing payment:', error);
        }
      );
    } else {
      alert('Please fill out all fields correctly.');
    }
  }

  processPayment(method: string, paymentInfo: any): boolean {
    console.log(`Processing payment with ${method}:`, paymentInfo);
    return this.cartService.checkout();
  }

  ngOnInit(): void {
    this.paymentRequest.amount=this.cartService.getCartTotal();
    this.paymentRequest.currency = 'EGP';
  }
}

export class PaymentRequest {
  cardNumber?: string;
  cardHolderName?: string;
  expirationDate?: string;
  cvv?: string;
  amount?: number;
  currency?: string;
  billingAddress?: string;
}
