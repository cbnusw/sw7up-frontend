import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from 'dayjs';

@Pipe({
  name: 'endDate'
})
export class EndDatePipe implements PipeTransform {
  transform(value: Date | string): any {
    return dayjs(value).add(-1, 'days').toDate();
  }
}
