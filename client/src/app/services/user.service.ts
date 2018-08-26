/** @format */

import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from 'angularfire2/firestore';

import { User } from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user: User;
  private _userDoc: AngularFirestoreDocument<any>;

  constructor(private angularFirestore: AngularFirestore) {}

  get user(): User {
    return this._user;
  }

  set user(user: User) {
    this._user = user;
    this._userDoc = this.angularFirestore.doc<any>(this.userDBPath());
  }

  get userDoc(): AngularFirestoreDocument<any> {
    return this._userDoc;
  }

  userDBPath(): string {
    return `users/${this.userUid()}`;
  }

  userUid(): string {
    return this.user.uid;
  }
}
