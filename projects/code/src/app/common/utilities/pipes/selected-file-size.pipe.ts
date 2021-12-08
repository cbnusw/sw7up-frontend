import { Pipe, PipeTransform } from '@angular/core';
import { IProjectFile, ISelectableFile, TEntryList, TSelectableEntryList } from '../../../types/project-file';
import { FileSizePipe } from './file-size.pipe';

@Pipe({
  name: 'selectedFilesSize',
  pure: false
})
export class SelectedFilesSizePipe implements PipeTransform {

  constructor(private fileSizePipe: FileSizePipe) {
  }

  transform(entries: TSelectableEntryList | TEntryList, all: boolean = false): string {

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
    const size = files.reduce((acc, file) => acc + file.size, 0) || 0;
    return this.fileSizePipe.transform(size);
  }

}
