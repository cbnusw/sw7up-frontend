import { Component, forwardRef, Input, OnInit, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ISelectOption } from '../../../../types/select-option';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectableButtonControlComponent),
  multi: true,
};

@Component({
  selector: 'sw-selectable-button-control',
  templateUrl: './selectable-button-control.component.html',
  styleUrls: ['./selectable-button-control.component.scss'],
  providers: [VALUE_ACCESSOR]
})
export class SelectableButtonControlComponent implements ControlValueAccessor, OnInit {

  value: any;
  @Input() options: ISelectOption<any>[] = [];

  private onChange: any;
  private onTouch: any;

  constructor() {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  ngOnInit(): void {
  }

  changeValue(value: any): void {
    this.value = value;
    if (this.onChange) {
      this.onChange(value);
    }
  }
}
