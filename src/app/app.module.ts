import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ActivitionPageComponent } from './auth/components/activition-page/activition-page.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { HomepageComponent } from './auth/components/homepage/homepage.component';
import { WelcomePageComponent } from './auth/components/welcome-page/welcome-page.component';
import { HyperSwitchPaymentComponent } from './auth/components/hyper-switch-payment/hyper-switch-payment.component';
import { ProductListComponent } from './auth/components/product-list/product-list.component';
import { CartComponent } from './auth/components/cart/cart.component';
import { ConfirmationComponent } from './auth/components/confirmation/confirmation.component';
import { BankCreditComponent } from './auth/components/bank-credit/bank-credit.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ActivitionPageComponent,
    HomepageComponent,
    WelcomePageComponent,
    HyperSwitchPaymentComponent,
    ProductListComponent,
    CartComponent,
    ConfirmationComponent,
    BankCreditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NzLayoutModule,
    NzGridModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),

  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
