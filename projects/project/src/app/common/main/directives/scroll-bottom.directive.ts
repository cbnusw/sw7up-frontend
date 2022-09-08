import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[swScrollBottom]'
})
export class ScrollBottomDirective {

  @Output() bottom: EventEmitter<void> = new EventEmitter<void>();

  @HostListener('wheel') handleWheel(): void {
    if (this._isBottom) {
      this.bottom.emit();
    }
  }

  @HostListener('touchmove') handleTouchmove(): void {
    if (this._isBottom) {
      this.bottom.emit();
    }
  }

  constructor(
    private _elementRef: ElementRef
  ) {
  }

  private get _isBottom(): boolean {
    const top = this._elementRef.nativeElement.scrollTop;
    const scrollHeight = this._elementRef.nativeElement.scrollHeight;
    const offsetHeight = this._elementRef.nativeElement.offsetHeight;
    return top + offsetHeight >= scrollHeight;
  }
}
