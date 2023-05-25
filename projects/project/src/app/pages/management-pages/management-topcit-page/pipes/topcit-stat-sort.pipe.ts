import { Pipe, PipeTransform } from '@angular/core';
import { ConvertedTopcitStatDto } from '../services/topcit-stat-management.service';

@Pipe({
  name: 'topcitStatSort'
})
export class TopcitStatSortPipe implements PipeTransform {
  transform(list: ConvertedTopcitStatDto[]): any {
    return [...list].sort((a, b) => {
      if (a.no !== b.no) {
        return b.no - a.no;
      }
      if (a.category === '전국') {
        return -1;
      }
      if (b.category === '전국') {
        return 1;
      }
      if (a.category === '학교') {
        return -1;
      }
      if (b.category === '학교') {
        return 1;
      }
      return a.category >= b.category ? 1 : -1;
    });
  }
}
