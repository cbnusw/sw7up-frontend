import { Component, EventEmitter, forwardRef, Input, OnInit, Output, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IProjectMento, IProjectSubject } from '../../../../types';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SubjectInputComponent),
  multi: true,
};

@Component({
  selector: 'sw-subject-input',
  templateUrl: './subject-input.component.html',
  styleUrls: ['./subject-input.component.scss'],
  providers: [VALUE_ACCESSOR]
})
export class SubjectInputComponent implements ControlValueAccessor, OnInit {


  @Input() disabled = false;
  @Input() submitted = false;
  @Input() options = {};
  @Input() value: IProjectSubject = {
    name: null,
    professor: null,
    mentoList: [],
  };
  @Output() valueChange: EventEmitter<IProjectSubject | null> = new EventEmitter<IProjectSubject | null>();

  labelWidth = '75px';

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

  writeValue(value: IProjectSubject | null): void {
    this.value = value || this.value;
  }

  changeName(name: string): void {
    this.value.name = name;
    this._change();
  }

  changeProfessor(professor: string): void {
    this.value.professor = professor;
    this._change();
  }

  changeMentoList(list: IProjectMento[]): void {
    this.value.mentoList = list;
    this._change();
  }

  ngOnInit(): void {
  }

  private _change(): void {
    const value = this.value.name && this.value.professor ? this.value : null;

    if (this._onChange) {
      this._onChange(value);
    }

    this.valueChange.emit(value);
  }
}
