import { Pipe, PipeTransform } from '@angular/core';
import { Languages } from '../services/my-report.service';

@Pipe({
  name: 'sortedLanguageKeys'
})
export class SortedLanguageKeysPipe implements PipeTransform {
  transform(languages: Languages): string[] {
    return Object.keys(languages).sort();
  }
}
