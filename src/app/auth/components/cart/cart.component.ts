import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from "../product-list/IProduct";
import { CartService } from "./cartService";
import {PayMobService} from "./payMobService";
import {PaymobIframeService} from "./paymobIFrame";
import {FawryLinkIntegrationService} from "./fawryLinkIntegrationService";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: { product: IProduct, count: number }[] = [];
  totalAmount: number = 0;
  paymentMethod: string = '';
  paymobCheckoutMethod: string = '';
  showPaymobOptions: boolean = false;

  constructor(private cartService: CartService, private router: Router, private payMobService : PayMobService,
              private PaymobIFrame : PaymobIframeService , private FawryLinkIntegrationService : FawryLinkIntegrationService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.cartService.getCartItems();
    this.totalAmount = this.cartService.getCartTotal();
  }

  removeFromCart(index: number) {
    this.cartService.removeFromCart(index);
    this.loadCart(); // Reload cart items after removal
  }

  checkout() {

    if (this.paymentMethod === 'HYperSwitch') {
      this.router.navigate(['/hyperswitch-payment']);
    }

    else if (this.paymentMethod === 'paymob') {
      if (this.paymobCheckoutMethod === 'Iframe') {
        this.PaymobIFrame.firstStep();
      }

      else if (this.paymobCheckoutMethod === 'Redirect') {
        this.payMobService.createPayment().subscribe(
          {
            next: response => {
              const clientSecret = response.client_secret;
              const url = this.payMobService.getUnifiedCheckoutUrl(clientSecret);
              window.location.href = url;
            },
            error: err => console.error(err)
          });
      }

    }
    else if (this.paymentMethod === 'fawry') {
      if (this.paymobCheckoutMethod === 'Iframe') {
        this.router.navigate(['/fawry-button-integration'])
      }

      else if (this.paymobCheckoutMethod === 'Redirect') {
        this.FawryLinkIntegrationService.initiatePayment1();
      }

    }
    else if (this.paymentMethod === 'Stripe') {
      this.router.navigate(['/stripe']);
    }
  }
  paymobCheckout() {
    this.payMobService.createPayment().subscribe(
      {
      next: response => {

        const clientSecret = response.client_secret;
        const url = this.payMobService.getUnifiedCheckoutUrl(clientSecret);
        window.location.href = url;
      },
      error: err => console.error(err)
    });
  }
  paymobIframeCheckout() {
    this.PaymobIFrame.firstStep();
  }

  FawryButtonIntegration() {
    this.router.navigate(['/fawry-button-integration'])
  }

  FawrylinkIntegration() {
    this.FawryLinkIntegrationService.initiatePayment1();
  }

  onPaymentMethodChange() {
    this.showPaymobOptions = this.paymentMethod === 'paymob' || this.paymentMethod === 'fawry';
  }
}
