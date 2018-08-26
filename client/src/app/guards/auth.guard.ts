/** @format */

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '@app/services';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService
      .isAuthenticated()
      .pipe(
        tap(
          isAuthenticated =>
            isAuthenticated ? () => {} : this.router.navigate(['signin'])
        )
      );
  }
}
