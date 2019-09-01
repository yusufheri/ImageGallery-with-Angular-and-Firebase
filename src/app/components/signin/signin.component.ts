import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styles: []
})
export class SigninComponent implements OnInit {

  formSignin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/['0-9a-zA-Z']{6,}/)])
  });
  constructor(private authentification: AuthService) { }

  ngOnInit() {
  }

  onSubmit(formValue) {
    // (click)="authentification.SignIn(email.value, password.value)"
    if (this.formSignin.valid) {
      const email = formValue.value['email'];
      const password = formValue.value['password'];
      this.authentification.SignIn(email, password);
      this.formSignin.reset();
    } else {
      console.error("Invalid")
    }
  }

}
