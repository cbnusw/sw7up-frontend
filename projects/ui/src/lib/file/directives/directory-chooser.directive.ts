import { Directive, ElementRef, Input } from '@angular/core';
import { FileChooserDirective } from './file-chooser.directive';

@Directive({
  selector: '[swDirectoryChooser]'
})
export class DirectoryChooserDirective extends FileChooserDirective {

  @Input() nameFilters: RegExp[] = [];
  @Input() mimeFilters: RegExp[] = [];

  constructor(elementRef: ElementRef) {
    super(elementRef);
    (this.fileInput as any).webkitdirectory = true;
    this.fileInput.multiple = true;
    this.fileInput.accept = '*/*';
  }

  set multiple(multiple: boolean) {
    this.fileInput.multiple = true;
  }


  set accept(accept: string) {
    this.fileInput.accept = '*/*';
  }

  ngOnInit() {
    this.fileInput.onchange = e => {
      const { files } = (e.target as any);
      const results = [];
      for (const file of files) {
        let ok = false;
        ok = (this.nameFilters || []).length === 0 || this.nameFilters.some(pattern => pattern.test(file.name));
        ok = (this.mimeFilters || []).length === 0 || this.mimeFilters.some(pattern => pattern.test(file.type));
        if (ok) {
          results.push(file);
        }
      }
      this.filesChange.emit(results);
      this.fileInput.value = '';
    };

    if (!this.isDisabled) {
      this.elementRef.nativeElement.onclick = this.handleClick;
    }
  }
}
