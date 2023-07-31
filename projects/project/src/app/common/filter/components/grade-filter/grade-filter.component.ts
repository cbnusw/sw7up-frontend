import { Component, EventEmitter, forwardRef, Input, OnInit, Output, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ISelectOption } from '../../../../types';
import { FILTER_LABEL_BASIS } from '../constants';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => GradeFilterComponent),
  multi: true,
};

@Component({
  selector: 'sw-grade-filter',
  templateUrl: './grade-filter.component.html',
  styleUrls: ['./grade-filter.component.scss'],
  providers: [VALUE_ACCESSOR]
})
export class GradeFilterComponent implements ControlValueAccessor, OnInit {

  @Input() labelBasis: string = FILTER_LABEL_BASIS;
  @Input() value: number | null = null;
  @Output() valueChange: EventEmitter<number | null> = new EventEmitter<number | null>();

  options: ISelectOption[] = [
    { viewValue: '전체', value: null },
    ...[1, 2, 3, 4, 5, 6].map(value => ({ viewValue: `${value} 학년`, value }))
  ];

  private _onChange?: any;
  private _onTouch?: any;

  change(value: any): void {
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

  writeValue(value: number | null): void {
    this.value = value;
  }

  ngOnInit(): void {
  }
}
