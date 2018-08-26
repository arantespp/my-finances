/** @format */

import { Component, OnInit, Input } from '@angular/core';

import { Expense } from '@app/models';

@Component({
  selector: 'app-expenses-view',
  templateUrl: './expenses-view.component.html',
  styleUrls: ['./expenses-view.component.scss']
})
export class ExpensesViewComponent implements OnInit {
  @Input()
  expense: Expense;

  constructor() {}

  ngOnInit() {}
}
