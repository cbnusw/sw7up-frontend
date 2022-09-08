import { Component, EventEmitter, forwardRef, Input, OnInit, Output, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ISelectOption } from '../../../../types';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectButtonsComponent),
  multi: true,
};

@Component({
  selector: 'sw-select-buttons',
  templateUrl: './select-buttons.component.html',
  styleUrls: ['./select-buttons.component.scss'],
  providers: [VALUE_ACCESSOR]
})
export class SelectButtonsComponent implements ControlValueAccessor, OnInit {
  readonly STYLE_CLASSES = [
    'text-secondary-500 bg-white border-secondary-200 hover:bg-secondary-50',
    'font-bold text-white border-info-600 bg-info-500 hover:bg-info-400 hover:border-info-500'
  ];

  @Input() value: any;
  @Input() options: ISelectOption[] = [];
  @Input() disabled = false;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  private _onChange: any;
  private _onTouch: any;

  constructor() {
  }

  select(value: any): void {
    if (this.disabled) {
      return;
    }

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

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: any): void {
    this.value = value;
  }

  ngOnInit(): void {
  }
}
