import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Pipe({
  name: 'downloadSourceLink'
})
export class DownloadSourceLinkPipe implements PipeTransform {
  codeHost = environment.codeHost;

  transform(id: string): unknown {
    return `${this.codeHost}/projects/${id}/download`;
  }

}
