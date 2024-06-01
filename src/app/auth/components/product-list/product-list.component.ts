import { Component, OnInit } from '@angular/core';
import { CartService } from "../cart/cartService";
import { IProduct } from "./IProduct";

class ICategory {
  Name: any;
  id: any;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  catlist: ICategory[];
  prdList: IProduct[];
  selectedCatID: number = 0;
  orderTotalPrice: number = 0;
  orderDate: Date;
  showAddToCartMessage: boolean[] = [];

  constructor(private cartService: CartService) {
    this.catlist = [
      { id: 1, Name: 'laptops' },
      { id: 2, Name: 'tablets' },
      { id: 3, Name: 'mobiles' }
    ];
    this.prdList = [
      { id: 100, Name: 'lenovo Laptop', price: 100, quantity: 2, imgUrl: 'assets/lenovo.jpg', categoryId: 1 },
      { id: 200, Name: 'Apple macbook laptop', price: 200, quantity: 0, imgUrl: 'assets/macApple.jpg', categoryId: 1 },
      { id: 300, Name: 'lenovo tap', price: 250, quantity: 3, imgUrl: 'assets/lenovoTap.jpg', categoryId: 2 },
      { id: 400, Name: 'samsung tap', price: 350, quantity: 4, imgUrl: 'assets/samsung.jpg', categoryId: 2 },
      { id: 500, Name: 'samsung note11', price: 400, quantity: 3, imgUrl: 'assets/samsungNote.jpg', categoryId: 3 },
      { id: 600, Name: 'samsung ss', price: 600, quantity: 3, imgUrl: 'assets/samsungss.jpg', categoryId: 3 }
    ];
    this.orderDate = new Date();
  }

  ngOnInit(): void {}

  buy(prd: IProduct, count: any) {
    const itemCount = Number(count);
    if (itemCount > 0) {
      this.cartService.addToCart(prd, itemCount);
      this.updateOrderTotalPrice();
    }
  }

  getSelCat(value: string) {
    this.selectedCatID = Number(value);
  }

  // changeCat() {
  //   this.selectedCatID = 1;
  // }
  addToCart(prd: IProduct, count: any) {
    const itemCount = Number(count);
    if (itemCount > 0) {
      this.cartService.addToCart(prd, itemCount);
      this.updateOrderTotalPrice();
      this.showAddToCartMessage[this.prdList.indexOf(prd)] = true;
      setTimeout(() => {
        this.showAddToCartMessage[this.prdList.indexOf(prd)] = false;
      }, 3000); // Hide the message after 3 seconds
    }
  }

  updateOrderTotalPrice() {
    this.orderTotalPrice = this.cartService.getCartTotal();
  }

  checkMinValue(input: HTMLInputElement) {
    if (parseInt(input.value, 10) < 1) {
      input.value = '';
    }
  }
}
