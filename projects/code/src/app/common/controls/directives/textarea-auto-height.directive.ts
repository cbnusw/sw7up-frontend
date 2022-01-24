import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[swTextareaAutoHeight]'
})
export class TextareaAutoHeightDirective {

  @HostBinding('style.overflow-y') overflowY = 'hidden';
  @Input() @HostBinding('style.min-height') minHeight = '5rem';

  constructor(private _elementRef: ElementRef,
              private _renderer: Renderer2) {
  }

  @HostListener('keyup') handleKeyUp(): void {
    this._renderer.setStyle(this._elementRef.nativeElement, 'height', this.minHeight);
    this._renderer.setStyle(
      this._elementRef.nativeElement,
      'height',
      `${this._elementRef.nativeElement.scrollHeight}px`
    );
  }

  @HostListener('keydown') handleKeyDown(): void {
    this._renderer.setStyle(this._elementRef.nativeElement, 'height', this.minHeight);
    this._renderer.setStyle(
      this._elementRef.nativeElement,
      'height',
      `${this._elementRef.nativeElement.scrollHeight}px`
    );
  }

}
