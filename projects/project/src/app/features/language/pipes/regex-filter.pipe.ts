import { Pipe, PipeTransform } from '@angular/core';
import { IProjectLanguage } from '../../../types';

@Pipe({
  name: 'regexFilter'
})
export class RegexFilterPipe implements PipeTransform {
  transform(languages: IProjectLanguage[], keyword: string | null): IProjectLanguage[] {
    const s = '.*+?^$[]{}()|\\';
    keyword = (keyword || '').split('').map(c => s.includes(c) ? '\\' + c : c).join('');
    const regex = new RegExp(keyword, 'i');
    return languages.filter(item => regex.test(item.language));
  }
}
