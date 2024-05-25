// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthenticationControllerService} from "./services/authentication-controller.service";
import {TokenService} from "./token.service";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationControllerService, private router: Router,private tokenService :TokenService) {}

  canActivate(): boolean {
    debugger;
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
