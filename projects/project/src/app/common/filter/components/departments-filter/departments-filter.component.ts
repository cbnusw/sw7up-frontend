import { Component, EventEmitter, forwardRef, Input, OnInit, Output, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MAJORS } from 'shared';
import { ISelectOption } from '../../../../types';
import { FILTER_LABEL_BASIS } from '../constants';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DepartmentsFilterComponent),
  multi: true,
};

const DEFAULT_VALUE = [...MAJORS, '기타'];

@Component({
  selector: 'sw-departments-filter',
  templateUrl: './departments-filter.component.html',
  styleUrls: ['./departments-filter.component.scss'],
  providers: [VALUE_ACCESSOR]
})
export class DepartmentsFilterComponent implements ControlValueAccessor, OnInit {

  @Input() labelBasis: string = FILTER_LABEL_BASIS;
  @Input() value: string[] = [...DEFAULT_VALUE];
  @Output() valueChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  options: ISelectOption[] = [...MAJORS.map(value => ({ value })), { value: '기타' }];

  private _onChange?: any;
  private _onTouch?: any;

  toggleAll(): void {
    if (this.allCheck) {
      this.value = [];
    } else {
      this.value = this.options.map(option => option.value);
    }
    this._change();
  }

  get allCheck(): boolean {
    return this.value.length === this.options.length;
  }

  get indeterminate(): boolean {
    return this.value.length > 0 && this.value.length !== this.options.length;
  }

  toggleOption(event: any): void {
    const { value, checked } = event.target;
    if (checked) {
      this.value.push(value);
    } else {
      const i = this.value.indexOf(value);
      this.value.splice(i, 1);
    }

    this._change();
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouch = fn;
  }

  writeValue(value: string[]): void {
    this.value = value || [...DEFAULT_VALUE];
  }

  ngOnInit(): void {
  }

  private _change(): void {
    if (this._onChange) {
      this._onChange(this.value);
    }
    this.valueChange.emit(this.value);
  }
}
