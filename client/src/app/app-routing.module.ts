/** @format */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, LoginGuard } from '@app/guards';

import {
  AuthSignInComponent,
  DashboardComponent,
  ExpensesComponent,
  IncomesComponent,
  MainNavComponent
} from '@app/components';

import { UserDataResolver } from '@app/resolvers';

const routes: Routes = [
  {
    path: 'signin',
    component: AuthSignInComponent,
    canActivate: [LoginGuard]
  },
  {
    path: '',
    component: MainNavComponent,
    canActivate: [AuthGuard],
    resolve: {
      userData: UserDataResolver
    },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'incomes',
        component: IncomesComponent
      },
      {
        path: 'expenses',
        component: ExpensesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
