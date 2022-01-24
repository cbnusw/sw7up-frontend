import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[swTextarea]'
})
export class TextareaDirective {

  @HostBinding('class') styleClass =
    'px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300';

  constructor() {
  }

}
