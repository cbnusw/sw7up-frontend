import { Pipe, PipeTransform } from '@angular/core';
import { IUserInfo } from 'shared';

@Pipe({
  name: 'unidentity'
})
export class UnidentityPipe implements PipeTransform {

  transform(user: IUserInfo): string {
    if (user.role === 'staff') {
      return `${user.no.substr(0, 3)}**${user.no.substr(5)}`;
    } else if (user.role === 'student') {
      return `${user.no.substr(0, 4)}*****${user.no.substr(9)}`;
    } else {
      return user.no.substr(0, Math.floor(user.no.length / 2)).padEnd(user.no.length, '*');
    }
  }
}
