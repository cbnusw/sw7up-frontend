import { Component, forwardRef, OnInit, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IProjectBanner } from '../../../../types';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SlideInputComponent),
  multi: true,
};


@Component({
  selector: 'sw-slide-input',
  templateUrl: './slide-input.component.html',
  styleUrls: ['./slide-input.component.scss'],
  providers: [VALUE_ACCESSOR],
})
export class SlideInputComponent implements ControlValueAccessor, OnInit {

  readonly IMAGE = '이미지';
  readonly VIDEO = '비디오';

  value: IProjectBanner[] = [];
  disabled = false;
  type = this.IMAGE;

  options = [this.IMAGE, this.VIDEO];

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
    this.disabled = isDisabled;
  }

  writeValue(value: IProjectBanner[]): void {
    this.value = value || [];
  }

  ngOnInit(): void {
  }

}
