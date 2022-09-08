import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'siPrefix'
})
export class SiPrefixPipe implements PipeTransform {
  constructor(private decimalPipe: DecimalPipe) {
  }

  transform(value: number): string {
    const prefixes = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
    let N = value;
    let index = 0;
    while (N >= 1000) {
      N /= 1000;
      index++;
    }
    const digitsInfo = index < 0 ? undefined : '1.0-1';
    return `${this.decimalPipe.transform(N, digitsInfo)}${prefixes[index]}`;
  }

}
