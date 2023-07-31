import { Component, EventEmitter, forwardRef, Input, OnInit, Output, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ISelectOption } from '../../../../types';
import { FILTER_LABEL_BASIS } from '../constants';

export type MemberFilter = {
  no: string | null;
  name: string | null;
};

const DEFAULT_VALUE: MemberFilter = {
  name: null,
  no: null,
};

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MemberFilterComponent),
  multi: true,
};

@Component({
  selector: 'sw-member-filter',
  templateUrl: './member-filter.component.html',
  styleUrls: ['./member-filter.component.scss'],
  providers: [VALUE_ACCESSOR]
})
export class MemberFilterComponent implements ControlValueAccessor, OnInit {

  @Input() label = '학생 정보';
  @Input() labelBasis: string = FILTER_LABEL_BASIS;
  @Input() value: MemberFilter = DEFAULT_VALUE;
  @Output() valueChange: EventEmitter<MemberFilter> = new EventEmitter<MemberFilter>();
  @Input() staff = false;

  options: ISelectOption[] = [{ value: '이름' }, { value: '학번' }];
  option: '이름' | '학번' | '교번' = '이름';

  private _onChange?: any;
  private _onTouch?: any;

  changeOption(option: '이름' | '학번' | '교번'): void {
    this.value.name = this.value.no = null;
    this.option = option;
    this._change();
  }

  changeName(name: string): void {
    this.value.name = name;
    this._change();
  }

  changeNo(no: string): void {
    this.value.no = no;
    this._change();
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouch = fn;
  }

  writeValue(value: MemberFilter): void {
    value = value || { ...DEFAULT_VALUE };
    const { name, no } = value;
    this.value = value;
    this.option = !name && no ? (this.staff ? '교번' : '학번') : '이름';
  }

  ngOnInit(): void {
    if (this.staff) {
      this.options = [{ value: '이름' }, { value: '교번' }];
    }
  }

  private _change(): void {
    if (this._onChange) {
      this._onChange(this.value);
    }
    this.valueChange.emit(this.value);
  }
}
