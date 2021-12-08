import { Component, forwardRef, OnInit, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IUserInfo } from 'shared';
import { IProjectTeam } from '../../../types/project-team';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TeamControlComponent),
  multi: true,
};

@Component({
  selector: 'sw-team-control',
  templateUrl: './team-control.component.html',
  styleUrls: ['./team-control.component.scss'],
  providers: [VALUE_ACCESSOR]
})
export class TeamControlComponent implements ControlValueAccessor, OnInit {

  value: IProjectTeam;

  private onChange: any;
  private onTouch: any;

  constructor() {
  }

  addTeam(): void {
    this.value = {
      name: null,
      members: [],
    };
    this._change();
  }

  changeName(name: string): void {
    this.value.name = name;
    this._change();
  }

  removeTeam(): void {
    this.value = null;
    this._change();
  }

  toggleMember(member: IUserInfo): void {
    const existed = this.value.members.find(m => m._id === member._id);
    if (!existed) {
      this.value.members.push(member);
      this._change();
    } else {
      alert('이미 추가한 팀원입니다.');
    }
  }

  removeMember(index: number): void {
    this.value.members.splice(index, 1);
    this._change();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(value: IProjectTeam): void {
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
