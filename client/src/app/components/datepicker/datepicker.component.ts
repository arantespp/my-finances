/** @format */

import { Component, OnInit, forwardRef } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true
    }
  ]
})
export class DatepickerComponent implements ControlValueAccessor, OnInit {
  _value: Date;

  // get accessor
  get value(): Date {
    return this._value;
  }

  // set accessor including call the onchange callback
  set value(value: Date) {
    if (value !== this._value) {
      this._value = value;
      this.propagateChange(value);
    }
  }

  constructor() {}

  ngOnInit() {}

  // propagate changes into the custom form control
  propagateChange = (_: any) => {};

  // From ControlValueAccessor interface
  writeValue(value: Date) {
    this._value = value;
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {}
}
