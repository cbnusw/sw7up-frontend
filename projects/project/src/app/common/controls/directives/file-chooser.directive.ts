import { Directive, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[swFileChooser]'
})
export class FileChooserDirective implements OnInit {

  @Input() accept = '*/*';
  @Input() multiple = false;
  @Output() filesChange: EventEmitter<File[]> = new EventEmitter<File[]>();

  private _fileInput: HTMLInputElement = document.createElement('input');
  private readonly _handleClick: (event: MouseEvent) => void;
  private _disabled = false;

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

  ngOnInit(): void {
    this._initialize();
  }

  private _setClickHandler(): void {
    const element: HTMLElement = this._elementRef.nativeElement;
    if (this._disabled) {
      element.removeEventListener('click', this._handleClick);
    } else {
      element.addEventListener('click', this._handleClick);
    }
  }

  private _initialize(): void {
    this._fileInput.type = 'file';
    this._fileInput.multiple = this.multiple;
    this._fileInput.accept = this.accept;
    this._setClickHandler();

    this._fileInput.addEventListener('change', event => {
      const files: File[] = Array.from((event.target as HTMLInputElement).files || []);
      this.filesChange.emit(files);
      this._fileInput.value = '';
    });
  }
}
