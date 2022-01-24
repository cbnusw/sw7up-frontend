import { forwardRef, Input, Provider } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SearchControlComponent),
  multi: true,
};

@Component({
  selector: 'sw-search-control',
  templateUrl: './search-control.component.html',
  styleUrls: ['./search-control.component.scss'],
  providers: [VALUE_ACCESSOR]
})
export class SearchControlComponent implements ControlValueAccessor, OnInit {

  @Input() placeholder = '검색';
  value: string;

  private onChange: any;
  private onTouch: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(keyword: string): void {
    this.value = keyword;
  }

  change(keyword: string): void {
    this.value = keyword;
    if (this.onChange) {
      this.onChange(this.value);
    }
  }
}
