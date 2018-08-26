/** @format */

import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  signIn() {
    this.authService.signInWithEmailAndPassword(
      'arantespp@gmail.com',
      'pedro123'
    );
  }

  signOut() {
    this.authService.signOut();
  }
}
