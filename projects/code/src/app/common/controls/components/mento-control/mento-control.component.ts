import { Component, forwardRef, OnInit, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IProjectMento } from '../../../../types/project';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MentoControlComponent),
  multi: true,
};

@Component({
  selector: 'sw-mento-control',
  templateUrl: './mento-control.component.html',
  styleUrls: ['./mento-control.component.scss'],
  providers: [VALUE_ACCESSOR],
})
export class MentoControlComponent implements ControlValueAccessor, OnInit {

  value: IProjectMento[] = [];

  private onChange: any;
  private onTouch: any;

  constructor() {
  }

  addMento(): void {
    this.value.push({ name: null, organization: null, position: null });
    this._change();
  }

  removeMento(index: number): void {
    this.value.splice(index, 1);
    this._change();
  }

  changeName(mento: IProjectMento, name: string): void {
    mento.name = name;
    this._change();
  }

  changeOrganization(mento: IProjectMento, organization: string): void {
    mento.organization = organization;
    this._change();
  }

  changePosition(mento: IProjectMento, position: string): void {
    mento.position = position;
    this._change();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(value: IProjectMento[]): void {
    this.value = value || [];
  }

  ngOnInit(): void {
  }

  private _change(): void {
    if (this.onChange) {
      this.onChange(this.value);
    }
  }
}
