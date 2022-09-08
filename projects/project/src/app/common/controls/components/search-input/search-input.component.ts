import { Component, EventEmitter, forwardRef, Input, OnInit, Output, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SearchInputComponent),
  multi: true,
};

@Component({
  selector: 'sw-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  providers: [VALUE_ACCESSOR],
})
export class SearchInputComponent implements ControlValueAccessor, OnInit {

  @Input() value: string = null;
  @Input() disabled = false;
  @Input() placeholder = '검색어 입력';
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  private _onChange: any;
  private _onTouch: any;

  constructor() {
  }

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

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: string): void {
    this.value = value;
  }

  ngOnInit(): void {
  }
}
