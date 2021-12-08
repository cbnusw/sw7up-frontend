import { Component, forwardRef, OnInit, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IProjectSubject, SEMESTERS, TSemester } from '../../../types/local-project';
import { ISelectOption } from '../../../types/select-option';

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

  semesterOptions: ISelectOption<string>[] = SEMESTERS.map(value => {
    if (value) {
      return { value };
    }
    return { viewValue: '선택안함', value };
  });

  value: IProjectSubject;

  private onChange: any;
  private onTouch: any;

  constructor() {
  }

  addSubject(): void {
    this.value = {
      name: null,
      code: null,
      professor: null,
      year: null,
      semester: null
    };
    this._change();
  }

  removeSubject(): void {
    this.value = null;
    this._change();
  }

  changeName(name: string): void {
    this.value.name = name;
    this._change();
  }

  changeCode(code: string): void {
    this.value.code = code;
    this._change();
  }

  changeProfessor(professor: string): void {
    this.value.professor = professor;
    this._change();
  }

  changeYear(year: number): void {
    this.value.year = year ? +year : null;
    this._change();
  }

  changeSemester(semester: TSemester): void {
    this.value.semester = semester;
    this._change();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(value: IProjectSubject): void {
    this.value = value || null;
  }

  ngOnInit(): void {
  }

  private _change(): void {
    if (this.onChange) {
      this.onChange(this.value);
    }
  }
}
