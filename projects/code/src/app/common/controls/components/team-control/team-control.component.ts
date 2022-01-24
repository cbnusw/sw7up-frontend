import { Component, forwardRef, OnInit, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IUserInfo } from 'shared';
import { INotJoinedMember, IProjectMember, IProjectTeam } from '../../../../types/project';
import { ISelectOption } from '../../../../types/select-option';

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
  notJoinedMember: INotJoinedMember;

  memberType: keyof IProjectMember = 'joined';

  memberTypeOptions: ISelectOption<keyof IProjectMember>[] = [
    { viewValue: '사업단 회원', value: 'joined' },
    { viewValue: '비회원', value: 'notJoined' }
  ];

  private onChange: any;
  private onTouch: any;

  constructor() {
  }

  addTeam(): void {
    this.value = {
      name: null,
      member: {
        github: [],
        joined: [],
        notJoined: []
      },
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

  addJoinedMember(member: IUserInfo): void {
    const existed = this.value.member.joined.find(m => m._id === member._id);
    if (!existed) {
      this.value.member.joined.push(member);
      this._change();
    } else {
      alert('이미 추가한 팀원입니다.');
    }
  }

  addNotJoinedMember(member: INotJoinedMember): void {
    const existed = this.value.member.notJoined.find(m => m.school === member.school && m.no === member.no);

    if (!existed) {
      this.value.member.notJoined.push(member);
      this.notJoinedMember = null;
      this._change();
    } else {
      alert('같은 학번의 팀원이 추가되어 있습니다.');
    }
  }

  removeJoinedMember(index: number): void {
    this.value.member.joined.splice(index, 1);
    this._change();
  }

  removeNotJoinedMember(index: number): void {
    this.value.member.notJoined.splice(index, 1);
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
