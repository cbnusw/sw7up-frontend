import { Component, EventEmitter, forwardRef, Input, OnInit, Output, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IProjectMento } from '../../../../types';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MentoListInputComponent),
  multi: true,
};

@Component({
  selector: 'sw-mento-list-input',
  templateUrl: './mento-list-input.component.html',
  styleUrls: ['./mento-list-input.component.scss'],
  providers: [VALUE_ACCESSOR]
})
export class MentoListInputComponent implements ControlValueAccessor, OnInit {

  @Input() value: IProjectMento[] = [];
  @Output() valueChange: EventEmitter<IProjectMento[]> = new EventEmitter<IProjectMento[]>();

  mento: IProjectMento = {
    name: null,
    organization: null,
    position: null,
  };

  private _onChange: any;
  private _onTouch: any;

  constructor() {
  }

  add(): void {
    if (!(this.mento.name || '').trim()) {
      alert('멘토 이름을 입력해주세요');
      return;
    }

    this.value.push({ ...this.mento });
    this.mento.name = this.mento.organization = this.mento.position = null;
    this._change();
  }

  remove(i: number): void {
    this.value.splice(i, 1);
    this._change();
  }

  changeName(name: string): void {
    this.mento.name = name;
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
  }

  ngOnInit(): void {
  }

  private _change(): void {
    if (this._onChange) {
      this._onChange(this.value);
    }
    this.valueChange.emit(this.value);
  }
}
