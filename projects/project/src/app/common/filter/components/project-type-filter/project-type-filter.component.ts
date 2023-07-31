import { Component, EventEmitter, forwardRef, Input, OnInit, Output, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ISelectOption, OWN_PROJECT_TYPES, PROJECT_TYPES, TOwnProjectType, TProjectType } from '../../../../types';
import { FILTER_LABEL_BASIS } from '../constants';

export type ProjectTypeFilter = {
  projectType: TProjectType | null;
  subjectName: string | null;
  ownProjectType: TOwnProjectType | null;
};

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ProjectTypeFilterComponent),
  multi: true,
};

const DEFAULT_VALUE: ProjectTypeFilter = {
  projectType: null,
  subjectName: null,
  ownProjectType: null,
};

@Component({
  selector: 'sw-project-type-filter',
  templateUrl: './project-type-filter.component.html',
  styleUrls: ['./project-type-filter.component.scss'],
  providers: [VALUE_ACCESSOR]
})
export class ProjectTypeFilterComponent implements ControlValueAccessor, OnInit {

  @Input() labelBasis: string = FILTER_LABEL_BASIS;
  @Input() value: ProjectTypeFilter = { ...DEFAULT_VALUE };
  @Output() valueChange: EventEmitter<ProjectTypeFilter> = new EventEmitter<ProjectTypeFilter>();

  private _onChange?: any;
  private _onTouch?: any;

  typeOptions: ISelectOption[] = [{ viewValue: '전체', value: null }, ...PROJECT_TYPES.map(value => ({ value }))];
  ownProjectOptions: ISelectOption[] = [{ viewValue: '전체', value: null }, ...OWN_PROJECT_TYPES.map(value => ({ value }))];

  changeType(option: TProjectType | null): void {
    this.value.subjectName = this.value.ownProjectType = null;
    this.value.projectType = option;
    this._change();
  }

  changeSubjectName(name: string): void {
    this.value.subjectName = name || null;
    this._change();
  }

  changeOwnProjectType(option: TOwnProjectType | null): void {
    this.value.ownProjectType = option;
    this._change();
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouch = fn;
  }

  writeValue(value: ProjectTypeFilter): void {
    this.value = value || { ...DEFAULT_VALUE };
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
