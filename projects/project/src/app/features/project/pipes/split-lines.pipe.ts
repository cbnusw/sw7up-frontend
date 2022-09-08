import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitLines'
})
export class SplitLinesPipe implements PipeTransform {

  transform(value: string): unknown {
    return value.split('\n');
  }

}
