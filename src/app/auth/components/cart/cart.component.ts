import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {IProduct} from "../product-list/IProduct";
import {CartService} from "./cartService";
import {PaymentService} from "../bank-credit/PaymentService";
import {PaymobService} from "../../../services/services/paymob.service";
import {PaymobIframeService} from "../../../services/services/paymob-iframe.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: { product: IProduct, count: number }[] = [];
  totalAmount: number = 0;

  constructor(private cartService: CartService,
              private paymobService: PaymobService,
              private paymobIframeService: PaymobIframeService,
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
    this.router.navigate(['/bank-credit']);
  }

  hyperSwitchCheckout() {
    this.router.navigate(['/hyperswitch-payment']);
  }

  fawryCheckout() {
    this.router.navigate(['/fawry-payment']);
  }

  paymobCheckout() {
    this.paymobService.createPayment().subscribe({
      next: response => {
        const clientSecret = response.client_secret;
        const url = this.paymobService.getUnifiedCheckoutUrl(clientSecret);
        window.location.href = url;
      },
      error: err => console.error(err)
    });
  }

  paymobIframeCheckout() {
    this.paymobIframeService.firstStep();
  }
}
