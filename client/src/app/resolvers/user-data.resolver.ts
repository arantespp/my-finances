/** @format */

import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

import { AuthService, UserService } from '@app/services';

import { Observable, EMPTY } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class UserDataResolver implements Resolve<Observable<string>> {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  resolve() {
    this.userService.user = this.authService.currentUser;
    return EMPTY.pipe(delay(1000));
  }
}
