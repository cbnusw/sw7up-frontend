import { Component, EventEmitter, forwardRef, Input, OnInit, Output, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ISelectOption, SEMESTERS, TProjectPerformedAt, TProjectSemesterIndex, TProjectYear } from '../../../../types';
import { FILTER_LABEL_BASIS } from '../constants';

type Performed = {
  year: TProjectYear | null;
  semester: TProjectSemesterIndex | null;
};

export type PerformedPeriodFilter = {
  start: TProjectPerformedAt | null;
  end: TProjectPerformedAt | null;
};

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PerformedFilterComponent),
  multi: true
};

const convert = (at: TProjectPerformedAt | null): Performed => {
  if (at) {
    const [year, semester] = at.split('-');
    return { year: +year, semester: +semester as TProjectSemesterIndex };
  }
  return {
    year: null,
    semester: null
  };
};

@Component({
  selector: 'sw-performed-filter',
  templateUrl: './performed-filter.component.html',
  styleUrls: ['./performed-filter.component.scss'],
  providers: [VALUE_ACCESSOR]
})
export class PerformedFilterComponent implements ControlValueAccessor, OnInit {

  @Input() labelBasis: string = FILTER_LABEL_BASIS;

  @Input() set value(value: PerformedPeriodFilter) {
    const { start, end } = value;
    this.start = convert(start);
    this.end = convert(end);
  }

  @Output() valueChange: EventEmitter<PerformedPeriodFilter> = new EventEmitter<PerformedPeriodFilter>();

  start: Performed = {
    year: null,
    semester: null
  };

  end: Performed = {
    year: null,
    semester: null,
  };

  semesterOptions: ISelectOption[] = SEMESTERS.map((semester, i) => ({ value: i, viewValue: semester }));

  private _onChange?: any;
  private _onTouch?: any;

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouch = fn;
  }

  writeValue(value: PerformedPeriodFilter): void {
    const { start, end } = value || { start: null, end: null };
    this.start = convert(start);
    this.end = convert(end);
  }

  changeStartYear(year: number): void {
    this.start.year = year;
    this._change();
  }

  changeStartSemester(semester: TProjectSemesterIndex): void {
    this.start.semester = semester;
    this._change();
  }

  changeEndYear(year: number): void {
    this.end.year = year;
    this._change();
  }

  changeEndSemester(semester: TProjectSemesterIndex): void {
    this.end.semester = semester;
    this._change();
  }

  ngOnInit(): void {
  }

  private _change(): void {
    const _convert = (at: Performed | null, defaultSemester: TProjectSemesterIndex): TProjectPerformedAt | null => {
      if (at.year) {
        const { year, semester } = at;
        return `${year}-${semester ?? defaultSemester}`;
      }
      return null;
    };
    const start = _convert(this.start, 0);
    const end = _convert(this.end, 3);
    const value: PerformedPeriodFilter = { start, end };
    if (this._onChange) {
      this._onChange(value);
    }
    this.valueChange.emit(value);
  }
}
