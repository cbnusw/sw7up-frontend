import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IProjectFile } from '../../../types';

@Pipe({
  name: 'staticUrl'
})
export class StaticUrlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(file: IProjectFile): SafeResourceUrl {
    if (file) {
      const path = file.path.replace(/^code-uploads/, '');
      return this.sanitizer.bypassSecurityTrustResourceUrl(path);
    }
    return '/assets/images/no-image.jpg';
  }

}
