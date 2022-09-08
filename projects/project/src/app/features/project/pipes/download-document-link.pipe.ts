import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IProjectFile } from '../../../types';

@Pipe({
  name: 'downloadDocumentLink'
})
export class DownloadDocumentLinkPipe implements PipeTransform {

  transform(file: IProjectFile): unknown {
    return `${environment.codeHost}/projects/documents/${file._id}/download`;
  }

}
