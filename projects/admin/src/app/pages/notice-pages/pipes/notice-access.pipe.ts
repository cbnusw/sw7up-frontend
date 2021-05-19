import { Pipe, PipeTransform } from '@angular/core';
import { TNoticeAccess } from 'shared';

@Pipe({
  name: 'noticeAccess'
})
export class NoticeAccessPipe implements PipeTransform {

  transform(value: TNoticeAccess): string {
    switch (value) {
      case 'operator':
        return '운영자';
      case 'staff':
        return '교직원';
      case 'student':
        return '학생';
      case 'member':
        return '일반회원';
      case 'nonmember':
        return '비회원';
      default:
        throw new Error('Unknown notice access value');
    }
  }

}
