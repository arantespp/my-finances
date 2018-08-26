/** @format */

import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

import { DbCollectionBasisHelper } from '@app/helpers';

import { Expense } from '@app/models';

import { UserService } from '@app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService extends DbCollectionBasisHelper<Expense> {
  constructor(angularFirestore: AngularFirestore, userService: UserService) {
    super(angularFirestore);
    super.setCollectionPath(`${userService.userDBPath()}/expenses`);
  }
}
