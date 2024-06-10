import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from "../product-list/IProduct";
import { CartService } from "./cartService";
import {PayMobService} from "./payMobService";
import {PaymobIframeService} from "./paymobIFrame";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: { product: IProduct, count: number }[] = [];
  totalAmount: number = 0;

  constructor(private cartService: CartService, private router: Router, private payMobService : PayMobService,
              private PaymobIFrame : PaymobIframeService ) {}

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
    this.router.navigate(['/hyperswitch-payment']);
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
}
