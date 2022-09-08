import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Pipe({
  name: 'downloadSourceLink'
})
export class DownloadSourceLinkPipe implements PipeTransform {

  transform(projectId: string): unknown {
    return `${environment.codeHost}/projects/${projectId}/source/download`;
  }

}
