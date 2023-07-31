import { Component, EventEmitter, forwardRef, Input, OnInit, Output, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FILTER_LABEL_BASIS } from '../constants';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextFilterComponent),
  multi: true
};

@Component({
  selector: 'sw-text-filter',
  templateUrl: './text-filter.component.html',
  styleUrls: ['./text-filter.component.scss'],
  providers: [VALUE_ACCESSOR],
})
export class TextFilterComponent implements ControlValueAccessor, OnInit {

  @Input() label = '텍스트';
  @Input() labelBasis: string = FILTER_LABEL_BASIS;
  @Input() value: string | null = null;
  @Output() valueChange: EventEmitter<string | null> = new EventEmitter<string | null>();

  private _onChange?: any;
  private _onTouch?: any;

  change(value: string): void {
    this.value = value || null;
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
