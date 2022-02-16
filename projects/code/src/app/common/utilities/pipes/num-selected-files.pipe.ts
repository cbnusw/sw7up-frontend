import { Pipe, PipeTransform } from '@angular/core';
import { IProjectMeta } from '../../../types/project';

@Pipe({
  name: 'NumOfFiles',
  pure: false
})
export class NumOfFilesPipe implements PipeTransform {

  transform(meta: IProjectMeta[]): number {
    return meta.reduce((acc, item) => acc + item.files, 0);
  }
}
