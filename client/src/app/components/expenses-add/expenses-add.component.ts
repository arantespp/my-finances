/** @format */

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ExpenseService } from '@app/services';

import { Expense } from '@app/models';

@Component({
  selector: 'app-expenses-add',
  templateUrl: './expenses-add.component.html',
  styleUrls: ['./expenses-add.component.scss']
})
export class ExpensesAddComponent implements OnInit {
  expensesAddForm = new FormGroup({
    date: new FormControl(new Date(), Validators.required),
    description: new FormControl('', Validators.required),
    value: new FormControl(null, Validators.required)
  });

  constructor(private expenseService: ExpenseService) {}

  ngOnInit() {}

  addExpense() {
    const expense: Expense = this.expensesAddForm.value;
    this.expenseService.add(expense).subscribe(() => this.resetForm());
  }

  resetForm() {
    this.expensesAddForm.reset({ date: new Date() });
  }
}
