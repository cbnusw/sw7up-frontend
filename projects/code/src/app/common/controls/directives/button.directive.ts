import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[swButton]'
})
export class ButtonDirective {

  @HostBinding('class') classes =
    'text-center border border-transparent font-medium shadow-md focus:outline-none';

  constructor() { }

}
