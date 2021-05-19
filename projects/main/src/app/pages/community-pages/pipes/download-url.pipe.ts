import { Pipe, PipeTransform } from '@angular/core';
import { IFile } from 'shared';
import { environment } from '../../../../environments/environment';

@Pipe({
  name: 'downloadUrl'
})
export class DownloadUrlPipe implements PipeTransform {

  transform(file: IFile): unknown {
    return `${environment.uploadHost}/${file._id}/download`;
  }

}
