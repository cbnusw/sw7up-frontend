import { Directive, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { IFileChooserOptions } from '../../../types/project-file';

@Directive({
  selector: '[swFileChooser]'
})
export class FileChooserDirective implements OnInit {

  private _options: IFileChooserOptions;

  @Output() filesChange: EventEmitter<File[]> = new EventEmitter<File[]>();

  @HostBinding('class.disabled') private _disabled = false;
  fileInput: HTMLInputElement;
  handleClick = () => this.fileInput.click();

  constructor(private elementRef: ElementRef) {
    this.fileInput = document.createElement('input');
    this.fileInput.type = 'file';
  }

  @Input() set options(options: IFileChooserOptions) {
    this.fileInput.accept = options.accept || '*/*';
    this.fileInput.multiple = options.multiple || false;
    this._options = options;
  }

  get options(): IFileChooserOptions {
    return this._options;
  }

  @Input() set disabled(disabled: boolean) {
    this._disabled = disabled;
    this.elementRef.nativeElement.onclick = disabled ? null : this.handleClick;
  }

  ngOnInit(): void {
    this.fileInput.onchange = e => {
      const files: File[] = Array.from((e.target as HTMLInputElement).files || [])
        .filter(f => this._filter(f));

      // files.sort(compareTracedEntry);
      this.filesChange.emit(files);
      this.fileInput.value = '';
    };

    this.elementRef.nativeElement.onclick = this._disabled ? null : this.handleClick;
  }

  private _filter(file: File): boolean {
    const {
      filenameFilters,
      mimetypeFilters,
      exceptFilenameFilters,
      exceptMimetypeFilters
    } = this.options;

    if (filenameFilters && !filenameFilters.some(filter => filter.test(file.name))) {
      return false;
    }

    if (mimetypeFilters && !mimetypeFilters.some(filter => filter.test(file.type))) {
      return false;
    }

    if (exceptFilenameFilters && exceptFilenameFilters.some(filter => filter.test(file.name))) {
      return false;
    }

    if (exceptMimetypeFilters && exceptMimetypeFilters.some(filter => filter.test(file.type))) {
      return false;
    }

    return true;
  }
}
