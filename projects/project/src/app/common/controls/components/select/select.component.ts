import { Component, EventEmitter, forwardRef, Input, OnInit, Output, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ISelectOption } from 'projects/project/src/app/types';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectComponent),
  multi: true,
};

@Component({
  selector: 'sw-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [VALUE_ACCESSOR],
})
export class SelectComponent implements ControlValueAccessor, OnInit {

  @Input() value: any;
  @Input() options: ISelectOption[] = [];
  @Input() placeholder = '선택';
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
  isOpenOptions = false;
  selected: ISelectOption;
  isDisabled: boolean;

  private _onChange: any;
  private _onTouch: any;

  constructor() {
  }

  writeValue(value: any): void {
    this.value = value;
    this.selected = this.options?.find(option => option.value === value);
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

  select(event: MouseEvent, option: ISelectOption): void {
    event.stopPropagation();
    this.selected = option;
    this.value = this.selected.value;
    this.isOpenOptions = false;
    if (this._onChange) {
      this._onChange(this.value);
    }
    this.valueChange.emit(this.value);
  }

  blur(event: FocusEvent): void {
    event.stopPropagation();
    this.isOpenOptions = false;
  }

  ngOnInit(): void {
    this.selected = this.options?.find(option => option.value === this.value);
  }
}
