import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'performedToSemester'
})
export class PerformedToSemesterPipe implements PipeTransform {
  transform(value: string, defaultIndex = 0): string {
    const semester = ['1학기', '여름학기', '2학기', '겨울학기'];
    const index = +value.split('-')[1];
    return semester[index] || semester[defaultIndex];
  }
}
