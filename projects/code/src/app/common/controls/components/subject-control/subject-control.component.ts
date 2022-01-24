import { Component, forwardRef, OnInit, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IProjectMento, IProjectSubject } from '../../../../types/project';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SubjectControlComponent),
  multi: true
};

@Component({
  selector: 'sw-subject-control',
  templateUrl: './subject-control.component.html',
  styleUrls: ['./subject-control.component.scss'],
  providers: [VALUE_ACCESSOR],
})
export class SubjectControlComponent implements ControlValueAccessor, OnInit {

  value: IProjectSubject = {
    name: null,
    professor: null,
    mentoList: []
  };

  private onChange: any;
  private onTouch: any;

  constructor() {
  }

  changeName(name: string): void {
    this.value.name = name;
    this._change();
  }

  changeProfessor(professor: string): void {
    this.value.professor = professor;
    this._change();
  }

  changeMentoList(mentoList: IProjectMento[]): void {
    this.value.mentoList = mentoList;
    this._change();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(value: IProjectSubject): void {
    this.value = value || {
      name: null,
      professor: null,
      mentoList: []
    };
  }

  ngOnInit(): void {
  }

  private _change(): void {
    if (this.onChange) {
      const name = this.value.name ? this.value.name.replace(/\s+/g, '') : null;
      this.onChange({ ...this.value, name });
    }
  }
}
