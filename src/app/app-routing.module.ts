// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/components/signup/signup.component';
import { LoginComponent } from './auth/components/login/login.component';
import { ActivitionPageComponent } from './auth/components/activition-page/activition-page.component';
import { HomepageComponent } from './auth/components/homepage/homepage.component';
import {NonAuthGuard} from "./services/services/NonAuthGuard";
import {AuthGuard} from "./services/AuthGuard";
import { WelcomePageComponent } from './auth/components/welcome-page/welcome-page.component';
import {ProductListComponent} from "./auth/components/product-list/product-list.component";
import {CartComponent} from "./auth/components/cart/cart.component";
import {ConfirmationComponent} from "./auth/components/confirmation/confirmation.component";
import {BankCreditComponent} from "./auth/components/bank-credit/bank-credit.component";


const routes: Routes = [
  { path: 'register', component: SignupComponent, canActivate: [NonAuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NonAuthGuard] },
  { path: 'activate-account', component: ActivitionPageComponent },
  { path: 'homepage', component: HomepageComponent, canActivate: [AuthGuard] },
  { path: '', component: WelcomePageComponent },
  {path: 'product', component: ProductListComponent, canActivate: [AuthGuard]},
  {path: 'cart', component: CartComponent, canActivate: [AuthGuard]},
  { path: 'bank-credit', component: BankCreditComponent,canActivate: [AuthGuard] },
  { path: 'confirmation', component: ConfirmationComponent,canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
