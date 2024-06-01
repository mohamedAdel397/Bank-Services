import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-hyper-switch-payment',
  templateUrl: './hyper-switch-payment.component.html',
  styleUrls: ['./hyper-switch-payment.component.scss']
})
export class HyperSwitchPaymentComponent implements OnInit {

  YOUR_PUBLISHABLE_KEY = 'pk_snd_8a63a89e0fbe47259d09437176203af0';
  hyper: any;
  widgets: any;
  client: any;

  ngOnInit(): void {
    // Initialize HyperSwitch when the component is initialized
    this.loadHyperSwitch();
  }

  async loadHyperSwitch() {
    debugger
    const response = await fetch('hyper-switch-payment/create', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({items: [{id: 'xl-tshirt'}], country: 'US'}),
    });
    const {clientSecret} = await response.json();
    this.client = clientSecret;

    // Initialize HyperSwitch
    this.hyper = (window as any).Hyper(this.YOUR_PUBLISHABLE_KEY);
    this.widgets = this.hyper.widgets({clientSecret});

    // Create payment checkout
    const unifiedCheckoutOptions = {
      wallets: {
        walletReturnUrl: 'https://example.com/complete',
      },
    };
    const unifiedCheckout = this.widgets.create('payment', unifiedCheckoutOptions);
    unifiedCheckout.mount('#unified-checkout');

    // await this.checkStatus();

    // Call handleSubmit and checkStatus

  }

  async handleSubmit(event: Event) {
    event.preventDefault();
    this.setLoading(true);
    await this.checkStatus();

    const {error} = await this.hyper.confirmPayment({
      widgets: this.widgets,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:4200/complete",
      },
    });

    // This point will only be reached if there is an immediate error occurring while confirming the payment. Otherwise, your customer will be redirected to your "return_url".

    // For some payment flows such as Sofort, iDEAL, your customer will be redirected to an intermediate page to complete authorization of the payment, and then redirected to the "return_url".

    if (error?.type === "validation_error") {
      this.showMessage(error.message);
    } else {
      this.showMessage("An unexpected error occurred.");
    }
    this.setLoading(false);
  }


  async checkStatus() {
    debugger
    if (!this.client) {
      console.log("error status")
      return;
    }
    console.log(this.client)
    const {payment} = await this.hyper.retrievePayment(this.client);

    switch (payment.status) {
      case "succeeded":
        this.showMessage("Payment succeeded!");
        break;
      case "processing":
        this.showMessage("Your payment is processing.");
        break;
      case "requires_payment_method":
        this.showMessage("Your payment was not successful, please try again.");
        break;
      default:
        this.showMessage("Something went wrong.");
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
