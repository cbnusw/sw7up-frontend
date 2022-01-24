import { Component, forwardRef, OnDestroy, OnInit, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IOwnProject, IProjectMento, OWN_PROJECT_TYPES, TOwnProjectType } from '../../../../types/project';
import { ISelectOption } from '../../../../types/select-option';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => OwnProjectControlComponent),
  multi: true,
};

@Component({
  selector: 'sw-own-project-control',
  templateUrl: './own-project-control.component.html',
  styleUrls: ['./own-project-control.component.scss'],
  providers: [VALUE_ACCESSOR],
})
export class OwnProjectControlComponent implements ControlValueAccessor, OnInit, OnDestroy {

  value: IOwnProject = { type: null, professor: null, mentoList: [] };
  typeOptions: ISelectOption<TOwnProjectType>[] = OWN_PROJECT_TYPES.map(value => ({ value }));

  private onChange: any;
  private onTouch: any;

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

  writeValue(value: IOwnProject): void {
    this.value = value || { type: null, professor: null, mentoList: [] };
  }

  ngOnInit(): void {
  }

  private _change(): void {
    if (this.onChange) {
      this.onChange(this.value);
    }
  }

  ngOnDestroy(): void {
  }
}
