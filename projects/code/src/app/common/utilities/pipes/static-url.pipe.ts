import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IProjectFile } from '../../../types/project-file';

@Pipe({
  name: 'staticUrl'
})
export class StaticUrlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(file: IProjectFile | null | undefined, emptyUrl?: string): SafeResourceUrl {
    if (file) {
      const path = file.path.replace(/^code-uploads/, '');
      return this.sanitizer.bypassSecurityTrustResourceUrl(path);
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(emptyUrl || '');
  }

}
