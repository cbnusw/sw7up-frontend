import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[swButton]'
})
export class ButtonDirective {

  @HostBinding('class') classes =
    'text-center border border-transparent font-medium shadow-sm text-white focus:outline-none';

  constructor() { }

}
