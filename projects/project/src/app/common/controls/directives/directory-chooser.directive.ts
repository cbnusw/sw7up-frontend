import { Directive, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { asyncScheduler, from } from 'rxjs';
import { observeOn, tap } from 'rxjs/operators';
import { IDirectoryEntry, INativeFile, TSourceTree } from '../../../types';

@Directive({
  selector: '[swDirectoryChooser]'
})
export class DirectoryChooserDirective implements OnInit {

  @Output() converting: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() directoryChange: EventEmitter<TSourceTree> = new EventEmitter<TSourceTree>();
  private _disabled = false;

  private _fileInput: HTMLInputElement = document.createElement('input');
  private readonly _handleClick: (event: MouseEvent) => void;

  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer2,
  ) {
    this._handleClick = (event: MouseEvent) => {
      event.stopPropagation();
      this._fileInput.click();
    };
  }

  @Input() set disabled(disabled: boolean) {
    this._disabled = disabled;
    this._setClickHandler();
  }

  private _setClickHandler(): void {
    const element: HTMLElement = this._elementRef.nativeElement;
    if (this._disabled) {
      element.removeEventListener('click', this._handleClick);
    } else {
      element.addEventListener('click', this._handleClick);
    }
  }

  ngOnInit(): void {
    this._initialize();
  }

  private _initialize(): void {
    this._fileInput.type = 'file';
    this._fileInput.multiple = true;
    this._fileInput.accept = '*/*';
    (this._fileInput as any).webkitdirectory = true;
    this._setClickHandler();

    this._fileInput.addEventListener('change', event => {
      const files: File[] = Array.from((event.target as HTMLInputElement).files || []);
      const entries: TSourceTree = [];

      this.converting.emit(true);
      from(files).pipe(
        observeOn(asyncScheduler),
        tap(file => this._convertPathToEntryList(file, entries))
      ).subscribe({
        complete: () => {
          this.directoryChange.emit(entries);
          this._fileInput.value = '';
          this.converting.emit(false);
        },
      });
    });
  }

  private _convertPathToEntryList(file: File, root: TSourceTree): void {
    const path = file.webkitRelativePath;
    const chunks = path.split('/');
    const directoryChunks = chunks.slice(0, chunks.length - 1);
    let current: TSourceTree = root;

    for (const dirname of directoryChunks) {
      let entry: IDirectoryEntry = current.find(e => {
        return 'dirname' in e && e.dirname === dirname;
      }) as IDirectoryEntry;
      if (!entry) {
        entry = { dirname, entries: [] };
        current.push(entry);
        current.sort((e1, e2) => {
          if ('dirname' in e1) {
            return ('dirname' in e2) ? (e1.dirname < e2.dirname ? -1 : 1) : -1;
          } else {
            return ('dirname' in e2) ? 1 : ((e1 as INativeFile).file.name < (e2 as INativeFile).file.name ? -1 : 1);
          }
        });
      }
      current = entry.entries as TSourceTree;
    }

    current.push({
      selected: false,
      file
    });
  }
}
