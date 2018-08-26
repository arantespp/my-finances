/** @format */

import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppUIModule } from './app-ui.module';
import { AppComponent } from './app.component';

import {
  AuthForgotPasswordComponent,
  AuthSignInComponent,
  AuthSignUpComponent,
  DashboardComponent,
  DatepickerComponent,
  ExpensesComponent,
  ExpensesAddComponent,
  ExpensesViewComponent,
  IncomesComponent,
  MainNavComponent
} from '@app/components';

import { AuthGuard, LoginGuard } from '@app/guards';

import { UserDataResolver } from '@app/resolvers';

import { AuthService, ExpenseService, UserService } from '@app/services';

import { environment } from '../environments/environment';

import { firebaseCredentials } from '@credentials/firebase-credentials';

@NgModule({
  declarations: [
    AppComponent,
    AuthForgotPasswordComponent,
    AuthSignInComponent,
    AuthSignUpComponent,
    DashboardComponent,
    DatepickerComponent,
    ExpensesComponent,
    ExpensesAddComponent,
    ExpensesViewComponent,
    IncomesComponent,
    MainNavComponent
  ],
  entryComponents: [AuthForgotPasswordComponent, AuthSignUpComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AppRoutingModule,
    AppUIModule,
    AngularFireModule.initializeApp(firebaseCredentials),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  providers: [
    AuthGuard,
    LoginGuard,
    UserDataResolver,
    AuthService,
    ExpenseService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
