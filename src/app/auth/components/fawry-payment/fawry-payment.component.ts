import {Component, OnInit} from '@angular/core';

declare var FawryPay: any;
declare var DISPLAY_MODE: any;

@Component({
  selector: 'app-fawry-payment',
  templateUrl: './fawry-payment.component.html',
  styleUrls: ['./fawry-payment.component.scss']
})
export class FawryPaymentComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  buildChargeRequest() {
    return {
      "merchantCode": "770000019394",
      "customerName": "Customer name",
      "customerMobile": "01011329938",
      "customerEmail": "m@example.com",
      "customerProfileId": "",
      "merchantRefNum": "7299790",
      "amount": 1399.92,
      "paymentExpiry": "",
      "currencyCode": "EGP",
      "language": "en-gb",
      "chargeItems": [
        {
          "itemId": "ac",
          "description": "Digital Signature",
          "price": 1399.92,
          "quantity": 1
        }
      ],
      "paymentMethod": "",
      "enable3DS": true,
      "returnUrl": "https://developer.fawrystaging.com",
      "description": "Payment for 6-REQDS-l8hu5gbn",
      "signature": "0ab6610de7e76792757496bbb9feb380b4a8afbbae0d56f0c7d05a7dbb2da50c"
    };
  }

  fawryCheckout() {
    const configuration = {
      locale: "en",  //default en
      mode: DISPLAY_MODE.INSIDE_PAGE,  //required, allowed values [POPUP, INSIDE_PAGE, SIDE_PAGE , SEPARATED]
    };
    FawryPay.checkout(this.buildChargeRequest(), configuration);
  }
}
