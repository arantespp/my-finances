/** @format */

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '@app/services';

@Component({
  selector: 'app-auth-sign-in',
  templateUrl: './auth-sign-in.component.html',
  styleUrls: ['./auth-sign-in.component.scss']
})
export class AuthSignInComponent implements OnInit {
  signInForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    persistence: new FormControl(false)
  });

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  signIn() {
    this.authService.signInWithEmailAndPassword(this.signInForm.value);
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle();
  }
}
