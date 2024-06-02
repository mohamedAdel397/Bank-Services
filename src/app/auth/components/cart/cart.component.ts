import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from "../product-list/IProduct";
import { CartService } from "./cartService";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: { product: IProduct, count: number }[] = [];
  totalAmount: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

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
}
