import { Component, EventEmitter, forwardRef, Input, OnInit, Output, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IOwnProject, IProjectMento, ISelectOption, OWN_PROJECT_TYPES, TOwnProjectType } from '../../../../types';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => OwnProjectInputComponent),
  multi: true
};

@Component({
  selector: 'sw-own-project-input',
  templateUrl: './own-project-input.component.html',
  styleUrls: ['./own-project-input.component.scss'],
  providers: [VALUE_ACCESSOR]
})
export class OwnProjectInputComponent implements ControlValueAccessor, OnInit {

  @Input() disabled = false;
  @Input() value: IOwnProject = {
    type: null,
    professor: null,
    mentoList: []
  };

  @Output() valueChange: EventEmitter<IOwnProject | null> = new EventEmitter<IOwnProject | null>();

  labelWidth = '100px';
  options: ISelectOption[] = OWN_PROJECT_TYPES.map(type => ({ viewValue: type, value: type }));

  private _onChange: any;
  private _onTouch: any;

  constructor() {
  }

  changeType(type: TOwnProjectType): void {
    this.value.type = type;
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

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: IOwnProject | null): void {
    this.value = value || this.value;
  }

  ngOnInit(): void {
  }

  private _change(): void {
    const value = this.value.type ? this.value : null;

    if (this._onChange) {
      this._onChange(value);
    }

    this.valueChange.emit(value);
  }
}
