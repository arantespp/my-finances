/** @format */

import { Component, OnInit } from '@angular/core';

import { Expense } from '@app/models';

import { ExpenseService } from '@app/services';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  expenses$: Observable<Expense[]>;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
    this.expenses$ = this.expenseService.getData(ref => ref);
    //   ref
    //     .where('date', '>=', new Date('2018-08-26T01:18:29.999Z'))
    //     .where('date', '<=', new Date('2018-08-26T01:20:29.119Z'))
    // );
  }
}
