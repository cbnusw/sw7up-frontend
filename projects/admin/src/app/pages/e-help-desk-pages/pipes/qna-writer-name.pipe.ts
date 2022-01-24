import { Pipe, PipeTransform } from '@angular/core';
import { IQna, IQnaReply } from 'shared';

@Pipe({
  name: 'qnaWriterName'
})
export class QnaWriterNamePipe implements PipeTransform {

  transform(value: IQna | IQnaReply): string {
    if (!value) {
      return '';
    }
    if (value.writer) {
      return value.writer?.name || '';
    } else {
      return value.writerInfo?.name || '';
    }
  }
}
