import { Component, EventEmitter, forwardRef, Input, OnInit, Output, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ISelectOption } from '../../../../types';
import { FILTER_LABEL_BASIS } from '../constants';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectFilterComponent),
  multi: true,
};

@Component({
  selector: 'sw-select-filter',
  templateUrl: './select-filter.component.html',
  styleUrls: ['./select-filter.component.scss'],
  providers: [VALUE_ACCESSOR]
})
export class SelectFilterComponent implements ControlValueAccessor, OnInit {
  @Input() label: string;
  @Input() labelBasis: string = FILTER_LABEL_BASIS;
  @Input() basis = '200px';
  @Input() options: ISelectOption[] = [];
  @Input() value: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

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

  writeValue(value: any): void {
    this.value = value;
  }

  ngOnInit(): void {
  }
}
