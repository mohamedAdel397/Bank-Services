import {Component, OnInit, Renderer2} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {PaymentService} from "./hyperService";

@Component({
  selector: 'app-hyper-switch-payment',
  templateUrl: './hyper-switch-payment.component.html',
  styleUrls: ['./hyper-switch-payment.component.scss']
})
export class HyperSwitchPaymentComponent implements OnInit {

  constructor(private paymentService: PaymentService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.loadHyperScript();
  }

  loadHyperScript(): void {
    const script = this.renderer.createElement('script');
    script.src = 'https://beta.hyperswitch.io/v1/HyperLoader.js';
    script.onload = () => {
      console.log('HyperLoader script loaded successfully');
      this.paymentService.initialize();
    };
    script.onerror = () => {
      console.error('Failed to load HyperLoader script.');
    };
    this.renderer.appendChild(document.body, script);
  }


  handleSubmit($event: SubmitEvent) { this.paymentService.handleSubmit($event);

  }
}
