import { Pipe, PipeTransform } from '@angular/core';
import { IProjectFile, TEntryList, TSelectableEntryList } from '../../../types/project-file';

@Pipe({
  name: 'numSelectedFiles',
  pure: false
})
export class NumSelectedFilesPipe implements PipeTransform {

  transform(entries: TSelectableEntryList | TEntryList, all: boolean = false): number {

    function convert(elist: TSelectableEntryList | TEntryList, flist: Array<IProjectFile | File>): void {
      elist.forEach(e => {
        if ('dirname' in e) {
          convert(e.entries, flist);
        } else if (all || e.selected) {
          flist.push(e.file || e);
        }
      });
    }

    const files: Array<IProjectFile | File> = [];
    convert(entries || [], files);
    return files.length;
  }

}
