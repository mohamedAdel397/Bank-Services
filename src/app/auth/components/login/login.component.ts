import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthenticationControllerService} from "../../../services/services/authentication-controller.service";
import {Router} from "@angular/router";
import {RegisterRequest} from "../../../services/models/register-request";
import {AuthenticationRequest} from "../../../services/models/authentication-request";
import {TokenService} from "../../../services/token.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });
//   constructor(private formBuilder: FormBuilder) { }
//
  ngOnInit(): void {
  }
//
//   onSubmit() {
//     // Handle form submission, e.g., send data to server
//     console.log(this.loginForm.value);
//   }
// }
  constructor(private formBuilder: FormBuilder,private authService:AuthenticationControllerService,private router:Router,private tokenService:TokenService) {

  }

  authenticationRequest: AuthenticationRequest | undefined;
  onSubmit() {
    this.authenticationRequest = this.loginForm.value as AuthenticationRequest;
    console.log(this.authenticationRequest)
    // console.log(this.userForm.value)
    this.authService.authenticate({
      body: this.authenticationRequest
    }).subscribe({
      next: (res) => {
        debugger
        console.log(res);
        this.tokenService.token = res.token as string;
        this.authService.userName=res.fullName as string;
        this.authService.login();
        this.router.navigate(['/homepage']);
      }
    });
  }

}
