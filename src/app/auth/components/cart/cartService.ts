import { Injectable } from '@angular/core';
import { IProduct } from "../product-list/IProduct";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: { product: IProduct, count: number }[] = [];

  constructor() {
    this.loadCartFromLocalStorage();
  }

  private saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  private loadCartFromLocalStorage() {
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.cart = JSON.parse(cart);
    }
  }

  addToCart(product: IProduct, count: number) {
    const existingProductIndex = this.cart.findIndex(item => item.product.id === product.id);
    if (existingProductIndex !== -1) {
      this.cart[existingProductIndex].count += count;
    } else {
      this.cart.push({ product, count });
    }
    this.saveCartToLocalStorage();
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
    this.saveCartToLocalStorage();
  }
  removeallFromCart() {
    this.cart.splice(0, this.cart.length);
    this.saveCartToLocalStorage();
  }
  getCartItems() {
    return this.cart;
  }

  getCartTotal() {
    return this.cart.reduce((total, item) => total + (item.product.price * item.count), 0);
  }

  checkout() {
    if (this.cart.length > 0) {
      console.log('Checkout successful. Products purchased:', this.cart);
      this.cart = [];
      this.saveCartToLocalStorage();
      return true;
    }
    return false;
  }
}
