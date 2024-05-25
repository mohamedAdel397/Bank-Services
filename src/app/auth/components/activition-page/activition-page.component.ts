import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthenticationControllerService} from "../../../services/services/authentication-controller.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-activition-page',
  templateUrl: './activition-page.component.html',
  styleUrls: ['./activition-page.component.scss']
})
export class ActivitionPageComponent implements OnInit {


  activationCodeForm = this.formBuilder.group({
    code0: ['', [Validators.required, Validators.pattern('[0-9]')]],
    code1: ['', [Validators.required, Validators.pattern('[0-9]')]],
    code2: ['', [Validators.required, Validators.pattern('[0-9]')]],
    code3: ['', [Validators.required, Validators.pattern('[0-9]')]],
    code4: ['', [Validators.required, Validators.pattern('[0-9]')]],
    code5: ['', [Validators.required, Validators.pattern('[0-9]')]]
  });


  constructor(private formBuilder: FormBuilder,
              private authService: AuthenticationControllerService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
   let code0Value = this.activationCodeForm.value.code0;
    let code1Value = this.activationCodeForm.value.code1;
    let code2Value = this.activationCodeForm.value.code2;
    let code3Value = this.activationCodeForm.value.code3;
    let code4Value = this.activationCodeForm.value.code4;
    let code5Value = this.activationCodeForm.value.code5;

// Concatenate the values into one variable
  let  concatenatedCode: string = `${code0Value}${code1Value}${code2Value}${code3Value}${code4Value}${code5Value}`;

    console.log(concatenatedCode);
    this.authService.confirm({
      token: concatenatedCode
    }).subscribe({
      next: () => {
        this.router.navigate(['login']);
      }
    });
  }


  onResend(): void {
  }
}
