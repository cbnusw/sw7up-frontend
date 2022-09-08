import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'youtubeVideoUrl'
})
export class YoutubeVideoUrlPipe implements PipeTransform {

  constructor(private _sanitizer: DomSanitizer) {
  }

  transform(link: string): SafeResourceUrl | null {
    if (link && /^https?:\/\/www\.youtu/.test(link)) {
      const url = new URL(link);
      const id = url.searchParams.get('v');
      return this._sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${id}`);
    } else if (link && /^(https?:\/\/youtu\.be\/|https?:\/\/y2u.be\/)/.test(link)) {
      const id = link.replace(/^(https?:\/\/youtu\.be\/|https?:\/\/y2u.be\/)/, '');
      return this._sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${id}`);
    }
    return null;
  }

}
