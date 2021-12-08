import { DecimalPipe } from '@angular/common';
import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Injectable()
@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {

  constructor(private decimalPipe: DecimalPipe) {
  }

  transform(size: number): string {
    const units = [' B', 'KB', 'MB', 'GB', 'TB', 'PB'];
    let current = size;
    let prev = 0;
    let unitPos = -1;

    while (current > 1) {
      prev = current;
      current /= 1024;
      unitPos++;
    }

    return `${this.decimalPipe.transform(prev, '1.1-1')} ${units[unitPos < 0 ? 0 : unitPos]}`;
  }

}
