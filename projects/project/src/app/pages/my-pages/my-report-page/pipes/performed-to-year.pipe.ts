import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'performedToYear'
})
export class PerformedToYearPipe implements PipeTransform {
  transform(value: string): number {
    return +(value || '').split('-')[0];
  }
}

