import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {IProduct} from "../product-list/IProduct";
import {CartService} from "./cartService";
import {PaymobService} from "../../../services/services/paymob.service";
import {FawryService} from "../../../services/services/fawry.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: { product: IProduct, count: number }[] = [];
  totalAmount: number = 0;
  paymentMethod: string = '';
  paymentType: string = '';

  constructor(private cartService: CartService,
              private paymobService: PaymobService,
              private fawryService: FawryService,
              private router: Router) {
  }

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
    if (this.paymentMethod === 'fawry' && this.paymentType === 'redirect') {
      this.fawryCheckout();
    } else if (this.paymentMethod === 'fawry' && this.paymentType === 'iframe') {
      this.fawryIframeCheckout();
    } else if (this.paymentMethod === 'paymob' && this.paymentType === 'redirect') {
      this.paymobCheckout();
    } else if (this.paymentMethod === 'paymob' && this.paymentType === 'iframe') {
      this.paymobIframeCheckout();
    } else if (this.paymentMethod === 'stripe') {
      this.stripeCheckout();
    } else if (this.paymentMethod === 'hyperswitch') {
      this.hyperSwitchCheckout();
    }
  }

  hyperSwitchCheckout() {
    this.router.navigate(['/hyperswitch-payment']);
  }

  fawryCheckout() {
    this.fawryService.initiatePayment1();
  }

  fawryIframeCheckout() {
    this.router.navigate(['/fawry-payment']);
  }

  paymobCheckout() {
    this.paymobService.createPayment().subscribe({
      next: response => {
        const clientSecret = response.client_secret;
        window.location.href = this.paymobService.getUnifiedCheckoutUrl(clientSecret);
      },
      error: err => console.error(err)
    });
  }

  paymobIframeCheckout() {
    this.router.navigate(['/paymob-iframe-payment']);
  }

  stripeCheckout() {
    this.router.navigate(['/stripe-payment']);
  }

}
