import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'youtubeThumbnail'
})
export class YoutubeThumbnailPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(link: string): SafeResourceUrl | null {
    if (link && /^https?:\/\/www\.youtu/.test(link)) {
      const url = new URL(link);
      const id = url.searchParams.get('v');
      return this.sanitizer.bypassSecurityTrustResourceUrl(`https://i.ytimg.com/vi/${id}/sddefault.jpg`);
    } else if (link && /^(https?:\/\/youtu\.be\/|https?:\/\/y2u.be\/)/.test(link)) {
      const id = link.replace(/^(https?:\/\/youtu\.be\/|https?:\/\/y2u.be\/)/, '');
      return this.sanitizer.bypassSecurityTrustResourceUrl(`https://i.ytimg.com/vi/${id}/sddefault.jpg`);
    }
    return null;
  }
}
