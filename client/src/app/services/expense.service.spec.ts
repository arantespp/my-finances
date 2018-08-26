/** @format */

import { TestBed, inject } from '@angular/core/testing';

import { ExpenseService } from './expense.service';

describe('ExpensesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExpenseService]
    });
  });

  it('should be created', inject(
    [ExpenseService],
    (service: ExpenseService) => {
      expect(service).toBeTruthy();
    }
  ));
});
