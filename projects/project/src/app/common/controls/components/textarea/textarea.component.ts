import { Component, forwardRef, Input, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextareaComponent),
  multi: true,
};

@Component({
  selector: 'sw-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  providers: [VALUE_ACCESSOR]
})
export class TextareaComponent implements ControlValueAccessor {

  @Input() placeholder = '';
  @Input() minHeight = '10rem';

  value: string;
  isDisabled = false;

  private _onChange: any;
  private _onTouch: any;

  constructor() {
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(value: string): void {
    this.value = value;
  }

  change(value: string): void {
    this.value = value;
    if (this._onChange) {
      this._onChange(this.value);
    }
  }
}
