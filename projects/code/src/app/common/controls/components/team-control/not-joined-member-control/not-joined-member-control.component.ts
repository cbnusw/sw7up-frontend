import { Component, EventEmitter, forwardRef, OnInit, Output, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { INotJoinedMember } from '../../../../../types/project';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NotJoinedMemberControlComponent),
  multi: true
};

@Component({
  selector: 'sw-not-joined-member-control',
  templateUrl: './not-joined-member-control.component.html',
  styleUrls: ['./not-joined-member-control.component.scss'],
  providers: [VALUE_ACCESSOR]
})
export class NotJoinedMemberControlComponent implements ControlValueAccessor, OnInit {

  @Output() memberChange: EventEmitter<INotJoinedMember> = new EventEmitter<INotJoinedMember>();

  value: INotJoinedMember = {
    school: null,
    department: null,
    no: null,
    name: null
  };

  private onChange: any;
  private onTouch: any;

  constructor() {
  }

  changeMember(): void {
    this.memberChange.emit(this.value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(obj: INotJoinedMember): void {
    this.value = obj || {
      school: null,
      department: null,
      no: null,
      name: null,
    };
  }

  ngOnInit(): void {
  }

}
