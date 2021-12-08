import { Directive, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { IDirectoryChooserOptions, IDirectoryEntry, TSelectableEntryList } from '../../../types/project-file';
import { compareTracedEntry } from '../../../utils/file';

@Directive({
  selector: '[swDirectoryChooser]'
})
export class DirectoryChooserDirective implements OnInit {

  @Input() options: IDirectoryChooserOptions = {};
  @Output() directoryChange: EventEmitter<TSelectableEntryList> = new EventEmitter<TSelectableEntryList>();
  @HostBinding('class.disabled') private _disabled = false;

  fileInput: HTMLInputElement;
  handleClick = () => this.fileInput.click();

  constructor(private elementRef: ElementRef) {
    this.fileInput = document.createElement('input');
    this.fileInput.type = 'file';
    this.fileInput.multiple = true;
    this.fileInput.accept = '*/*';
    (this.fileInput as any).webkitdirectory = true;
  }

  @Input() set disabled(disabled: boolean) {
    this._disabled = disabled;
    this.elementRef.nativeElement.onclick = disabled ? null : this.handleClick;
  }

  ngOnInit(): void {
    this.fileInput.onchange = e => {
      const files: File[] = Array.from((e.target as HTMLInputElement).files || []);
      const entries: TSelectableEntryList = [];

      files.forEach(file => this._convertPathToEntryList(file, entries));

      this.directoryChange.emit(entries);
      this.fileInput.value = '';
    };

    this.elementRef.nativeElement.onclick = this._disabled ? null : this.handleClick;
  }

  private _convertPathToEntryList(file: File, root: TSelectableEntryList): void {

    if (!this._validateFile(file)) {
      return;
    }

    const path: string = (file as any).webkitRelativePath;
    const chunks: string[] = path.split('/');
    const directories: string[] = chunks.slice(0, chunks.length - 1);
    let current: TSelectableEntryList = root;

    for (const dirname of directories) {
      if (!this._validateDirectory(dirname)) {
        return;
      }

      let entry: IDirectoryEntry = current.find(e => {
        return 'dirname' in e && e.dirname === dirname;
      }) as IDirectoryEntry;

      if (!entry) {
        entry = { dirname, entries: [] };
        current.push(entry);
        current.sort(compareTracedEntry);
      }

      current = entry.entries as TSelectableEntryList;
    }

    current.push({
      selected: false,
      file,
    });
    current.sort(compareTracedEntry);
  }

  private _validateFile(file: File): boolean {
    const {
      filenameFilters,
      mimetypeFilters,
      exceptFilenameFilters,
      exceptMimetypeFilters,
    } = this.options;

    if (filenameFilters && !filenameFilters.some(pattern => pattern.test(file.name))) {
      return false;
    } else if (mimetypeFilters && !mimetypeFilters.some(pattern => pattern.test(file.type))) {
      return false;
    } else if (exceptFilenameFilters && exceptFilenameFilters.some(pattern => pattern.test(file.name))) {
      return false;
    } else if (exceptMimetypeFilters && exceptMimetypeFilters.some(pattern => pattern.test(file.type))) {
      return false;
    }

    return true;
  }

  private _validateDirectory(dirname: string): boolean {
    const { directoryFilters, exceptDirectoryFilters } = this.options;

    if (directoryFilters && !directoryFilters.some(pattern => pattern.test(dirname))) {
      return false;
    } else if (exceptDirectoryFilters && exceptDirectoryFilters.some(pattern => pattern.test(dirname))) {
      return false;
    }

    return true;
  }
}
