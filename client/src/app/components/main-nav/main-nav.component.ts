/** @format */

import { Component } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService, UserService } from '@app/services';

@Component({
  selector: 'app-components-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  user;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.user = this.userService.user;
  }

  signOut() {
    this.authService.signOut();
  }
}
