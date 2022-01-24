import { Pipe, PipeTransform } from '@angular/core';
import { IQna, IQnaReply } from 'shared';

@Pipe({
  name: 'qnaWriterDepartment'
})
export class QnaWriterDepartmentPipe implements PipeTransform {

  transform(value: IQna | IQnaReply): string {
    if (!value) {
      return '';
    }
    if (value.writer) {
      return value.writer?.department || '';
    } else {
      return value.writerInfo?.department || '';
    }
  }

}
