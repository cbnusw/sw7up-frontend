import { Component, EventEmitter, forwardRef, Input, OnInit, Output, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ISelectOption } from '../../../../types';
import { FILTER_LABEL_BASIS } from '../constants';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SchoolFilterComponent),
  multi: true,
};

@Component({
  selector: 'sw-school-filter',
  templateUrl: './school-filter.component.html',
  styleUrls: ['./school-filter.component.scss'],
  providers: [VALUE_ACCESSOR]
})
export class SchoolFilterComponent implements ControlValueAccessor, OnInit {

  @Input() labelBasis: string = FILTER_LABEL_BASIS;
  @Input() value: string;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  options: ISelectOption[] = [
    { viewValue: '전체', value: null },
    { value: '충북대학교' },
    { value: '기타' },
  ];

  private _onChange?: any;
  private _onTouch?: any;

  change(value: string): void {
    this.value = value;
    if (this._onChange) {
      this._onChange(this.value);
    }
    this.valueChange.emit(this.value);
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouch = fn;
  }

  writeValue(value: string | null): void {
    this.value = value;
  }

  ngOnInit(): void {
  }
}
