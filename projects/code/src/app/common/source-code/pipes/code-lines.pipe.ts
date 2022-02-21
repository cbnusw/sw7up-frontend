import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'codeLines'
})
export class CodeLinesPipe implements PipeTransform {

  transform(codes: string): string[] {
    return codes.split('\n');
  }

}
