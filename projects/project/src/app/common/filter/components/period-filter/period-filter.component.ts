import { Component, EventEmitter, forwardRef, Input, OnInit, Output, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ISelectOption } from '../../../../types';
import { FILTER_LABEL_BASIS } from '../constants';

export type PeriodFilter = {
  start: Date | string | null;
  end: Date | string | null;
};

const DEFAULT_VALUE: PeriodFilter = {
  start: null,
  end: null
};

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PeriodFilterComponent),
  multi: true
};

@Component({
  selector: 'sw-period-filter',
  templateUrl: './period-filter.component.html',
  styleUrls: ['./period-filter.component.scss'],
  providers: [VALUE_ACCESSOR]
})
export class PeriodFilterComponent implements ControlValueAccessor, OnInit {
  @Input() label = '등록일';
  @Input() labelBasis: string = FILTER_LABEL_BASIS;
  @Input() value: PeriodFilter = DEFAULT_VALUE;
  @Output() valueChange: EventEmitter<PeriodFilter> = new EventEmitter<PeriodFilter>();

  options: ISelectOption[] = [{ viewValue: '전체', value: null }, { value: '기간설정' }];
  option: '기간설정' | null = null;

  private _onChange?: any;
  private _onTouch?: any;

  changeOption(option: '기간설정' | null): void {
    this.option = option;
    this.value.start = this.value.end = null;
    this._change();
  }

  changeStart(value: string): void {
    this.value.start = value;
    this._change();
  }

  changeEnd(value: string): void {
    this.value.end = value;
    this._change();
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouch = fn;
  }

  writeValue(value: PeriodFilter): void {
    const convert = (date: Date | string | null): string | null => {
      if (date) {
        date = new Date(date);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return [year, month, day].join('-');
      }
      return null;
    };

    const { start, end } = value || DEFAULT_VALUE;
    if (start || end) {
      this.option = '기간설정';
    }
    this.value.start = convert(start);
    this.value.end = convert(end);
  }

  ngOnInit(): void {
  }

  private _change(): void {
    const convert = (d: Date | string | null) => {
      if (d) {
        d = new Date(d);
        d.setHours(d.getHours() - 9);
        return d;
      }
      return null;
    };

    let { start, end } = this.value;
    start = convert(start);
    end = convert(end);

    if (this._onChange) {
      this._onChange({ start, end });
    }
    this.valueChange.emit({ start, end });
  }
}
