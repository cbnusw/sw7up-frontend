import { Pipe, PipeTransform } from '@angular/core';
import { IUserInfo } from 'shared';
import { INotJoinedMember } from '../../../types/project';

@Pipe({
  name: 'unidentity'
})
export class UnidentityPipe implements PipeTransform {

  transform(user: IUserInfo | INotJoinedMember): string {
    if (!('role' in user)) {
      return user.no;
    } else if (user.role === 'staff') {
      return `${user.no.substring(0, 3)}**${user.no.substring(5)}`;
    } else if (user.role === 'student') {
      return `${user.no.substring(0, 4)}*****${user.no.substring(9)}`;
    } else {
      return user.no.substring(0, Math.floor(user.no.length / 2)).padEnd(user.no.length, '*');
    }
  }
}
