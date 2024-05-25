import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationControllerService} from "../../../services/services/authentication-controller.service";
import {Router} from "@angular/router";
import {RegisterRequest} from "../../../services/models/register-request";
import {log} from "ng-zorro-antd/core/logger";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  userForm = this.fb.group({
    firstname: ['', [Validators.required, Validators.minLength(3)]],
    lastname: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],

  }, );

  ngOnInit(): void {
  }

  constructor(private fb: FormBuilder,private authService:AuthenticationControllerService,private router:Router) {

  }


  registerRequest: RegisterRequest | undefined;
  onSubmit() {
    this.registerRequest = this.userForm.value as RegisterRequest;
    console.log(this.registerRequest)
    // console.log(this.userForm.value)
    this.authService.register({
      body: this.registerRequest
    })
      .subscribe({
        next: () => {
          this.router.navigate(['activate-account']);
        }
      });
  }

  get password() {
    return this.userForm.get('password');
  }
  get firstname() {
    return this.userForm.get('firstname');
  }

  get lastname() {
    return this.userForm.get('lastname');
  }

  get email() {
    return this.userForm.get('email');
  }

}
