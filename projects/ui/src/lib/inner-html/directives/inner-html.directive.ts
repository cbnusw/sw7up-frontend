import { ElementRef, Input, Renderer2 } from '@angular/core';
import { Directive, EventEmitter, HostBinding, Output } from '@angular/core';

@Directive({
  selector: '[swInnerHtml]'
})
export class InnerHtmlDirective {

  @HostBinding('class') styleClass = 'ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline ck-blurred';

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2) { }

  @Input() set swInnerHtml(content: string) {
    this.renderer.setProperty(this.elementRef.nativeElement, 'innerHTML', content);
  }
}
