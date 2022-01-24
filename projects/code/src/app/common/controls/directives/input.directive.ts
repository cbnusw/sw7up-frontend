import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[swInput]'
})
export class InputDirective {

  @HostBinding('class') class: string =
    'px-3 py-2 border border-gray-300 leading-5 bg-white placeholder-gray-400 focus:outline-none' +
    ' focus:placeholder-gray-300 focus:ring-1 focus:ring-gray-300 focus:border-gray-300 sm:text-sm';

  constructor() { }

}
