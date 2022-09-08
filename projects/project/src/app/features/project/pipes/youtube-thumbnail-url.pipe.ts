import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'youtubeThumbnailUrl'
})
export class YoutubeThumbnailUrlPipe implements PipeTransform {

  constructor(private _sanitizer: DomSanitizer) {
  }

  transform(link: string): SafeResourceUrl | null {
    if (link && /^https?:\/\/www\.youtu/.test(link)) {
      const url = new URL(link);
      const id = url.searchParams.get('v');
      return this._sanitizer.bypassSecurityTrustResourceUrl(`https://i.ytimg.com/vi/${id}/sddefault.jpg`);
    } else if (link && /^(https?:\/\/youtu\.be\/|https?:\/\/y2u.be\/)/.test(link)) {
      const id = link.replace(/^(https?:\/\/youtu\.be\/|https?:\/\/y2u.be\/)/, '');
      return this._sanitizer.bypassSecurityTrustResourceUrl(`https://i.ytimg.com/vi/${id}/sddefault.jpg`);
    }
    return null;
  }
}
