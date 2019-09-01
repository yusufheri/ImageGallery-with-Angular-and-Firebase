import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: []
})
export class SignupComponent implements OnInit {

  isSubmitted = false;

  formSignup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]),
    confirm: new FormControl('', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]),
    terms: new FormControl(false, [Validators.requiredTrue]),
  });

  // convenience getter for easy access to form fields
  get f() { return this.formSignup.controls; }

  onSubmit() {
    this.isSubmitted = true;

    if (this.formSignup.valid) {
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.formSignup.value, null, 4));
    }
  }
  constructor() { }

  ngOnInit() {
  }

}
