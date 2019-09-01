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

  onSigin(formValue) {
    if (formValue.valid) {
      this.authentification.signIn(formValue.value['email'], formValue.value['password']);
    } else {
      console.error('Non valide');
    }
  }

}
