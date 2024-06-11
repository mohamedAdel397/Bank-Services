import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FawryLinkIntegrationService {

  constructor() { }

  buildChargeRequest() {
    const chargeRequest = {
      merchantCode: '770000019394',
      merchantRefNum: '7299790',
      customerMobile: '01010414443',
      customerEmail: 'email@domain.com',
      customerName: 'Customer Name',
      customerProfileId: '',
      paymentExpiry: '1631138400000',
      chargeItems: [
        {
          itemId: 'ac',
          description: 'Digital Signature',
          price: 1399.92,
          quantity: 1,
          imageUrl: 'https://developer.fawrystaging.com/photos/45566.jpg',
        }
      ],
      returnUrl: 'https://developer.fawrystaging.com',
      authCaptureModePayment: false,
      signature: "0ab6610de7e76792757496bbb9feb380b4a8afbbae0d56f0c7d05a7dbb2da50c"
    };
    console.log(chargeRequest)
    return chargeRequest;
  }

  async  initiatePayment1() {
    debugger
    const chargeRequest = this.buildChargeRequest();

    try {
      const response = await fetch('https://atfawry.fawrystaging.com/fawrypay-api/api/payments/init', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(chargeRequest)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.text();
      console.log('Response Data:', responseData);

      if (responseData != null) {
        // Redirect to the Fawry payment page
        window.location.href = responseData;
      } else {
        console.error('Failed to initiate payment:', responseData);
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  }
}
