import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: 'textarea [swAutoHeight]'
})
export class AutoHeightDirective {

  @Input()
  @HostBinding('style.min-height')
  swAutoHeight = '48px';

  @HostListener('keydown', ['$event']) handleKeyDown(e: KeyboardEvent): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'height', this.swAutoHeight);
    this.renderer.setStyle(this.elementRef.nativeElement, 'height', `${8 + this.elementRef.nativeElement.scrollHeight}px`);
  }

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2) {
  }

}
