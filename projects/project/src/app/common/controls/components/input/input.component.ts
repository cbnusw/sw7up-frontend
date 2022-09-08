import { Component, EventEmitter, forwardRef, Input, OnInit, Output, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true,
};

@Component({
  selector: 'sw-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [VALUE_ACCESSOR],
})
export class InputComponent implements ControlValueAccessor, OnInit {
  @Input() value: string | number | null = null;
  @Input() type: string;
  @Input() placeholder = '';
  @Input() readonly = false;
  @Input() disabled = false;
  @Input() hasError = false;
  @Output() valueChange: EventEmitter<string | number> = new EventEmitter<string | number>();


  private _onChange: any;
  private _onTouch: any;

  constructor() {
  }

  ngOnInit(): void {
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

  writeValue(value: string): void {
    this.value = value;
  }

  change(value: string): void {
    this.value = value;
    if (this._onChange) {
      this._onChange(this.value);
    }
    this.valueChange.emit(this.value);
  }
}
