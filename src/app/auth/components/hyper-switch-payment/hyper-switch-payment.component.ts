import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-hyper-switch-payment',
  templateUrl: './hyper-switch-payment.component.html',
  styleUrls: ['./hyper-switch-payment.component.scss']
})
export class HyperSwitchPaymentComponent implements OnInit {

  YOUR_PUBLISHABLE_KEY = 'pk_snd_7bcd513cbfb54f88b3b40696660f61eb';
  elements: any;
  hyper: any;
  clientSecret: string | undefined;

  ngOnInit(): void {
    // Initialize HyperSwitch when the component is initialized
    this.loadHyperSwitch();
  }

  constructor(private toastr: ToastrService) {}

  async loadHyperSwitch() {
    const response = await fetch('hyper-switch-payment/create', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({items: [{id: 'xl-tshirt'}], country: 'US'}),
    });
    const {clientSecret} = await response.json();
    this.clientSecret = clientSecret;

    // Initialize HyperSwitch
    this.hyper = (window as any).Hyper(this.YOUR_PUBLISHABLE_KEY);
    this.elements = this.hyper.elements({clientSecret});

    // Create payment checkout
    const unifiedCheckoutOptions = {
      wallets: {
        walletReturnUrl: 'https://example.com/complete',
      },
    };
    const unifiedCheckout = this.elements.create('payment', unifiedCheckoutOptions);
    unifiedCheckout.mount('#unified-checkout');
  }

  async handleSubmit(event: Event) {
    debugger
    event.preventDefault();
    this.setLoading(true);
    await this.checkStatus();

    const {error} = await this.hyper.confirmPayment({
      elements: this.elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:4200/complete",
      },
      redirect: "always"
    });

    // This point will only be reached if there is an immediate error occurring while confirming the payment.
    // Otherwise, your customer will be redirected to your "return_url".

    // For some payment flows such as Sofort, iDEAL,
    // your customer will be redirected to an intermediate page to complete authorization of the payment,
    // and then redirected to the "return_url".

    if (error?.type === "validation_error") {
      this.toastr.error(error.message, "Validation Error");
    } else {
      this.toastr.error("An unexpected error occurred.", "Error");
    }
    this.setLoading(false);
  }


  async checkStatus() {
    if (!this.clientSecret) {
      console.log("error status")
      return;
    }
    const payment = await this.hyper.retrievePaymentIntent(this.clientSecret);

    switch (payment.paymentIntent.status) {
      case "succeeded":
        this.toastr.success("Payment succeeded!", "Success");
        break;
      case "processing":
        this.toastr.info("Your payment is processing.", "Processing");
        break;
      case "requires_payment_method":
        this.toastr.warning("Your payment was not successful, please try again.", "Payment Failed");
        break;
      default:
        this.toastr.error("Something went wrong.", "Error");
        break;
    }
  }

  showMessage(message: string) {
    const messageContainer = document.getElementById('payment-message');
    if (messageContainer) {
      messageContainer.textContent = message;
      messageContainer.classList.remove('hidden');
    }
  }

  setLoading(isLoading: boolean) {
    const submitButton = document.getElementById('submit');
    const spinner = document.getElementById('spinner');
    const buttonText = document.getElementById('button-text');

    if (isLoading) {
      if (submitButton && spinner && buttonText) {
        spinner.classList.remove('hidden');
        buttonText.classList.add('hidden');
        submitButton.setAttribute('disabled', 'true');
      }
    } else {
      if (submitButton && spinner && buttonText) {
        spinner.classList.add('hidden');
        buttonText.classList.remove('hidden');
        submitButton.removeAttribute('disabled');
      }
    }
  }

}
