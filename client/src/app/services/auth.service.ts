/** @format */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router
  ) {}

  isAuthenticated(): Observable<boolean> {
    return this.angularFireAuth.authState.pipe(
      map(res => (res && res.uid ? true : false))
    );
  }

  get currentUser(): User {
    return this.angularFireAuth.auth.currentUser;
  }

  signInWithEmailAndPassword(email: string, password: string) {
    this.angularFireAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.successSignIn();
      });
  }

  signOut() {
    this.angularFireAuth.auth.signOut().then(() => this.successSignOut());
  }

  private successSignIn() {
    this.router.navigate(['']);
  }

  private successSignOut() {
    this.router.navigate(['signin']);
  }
}
