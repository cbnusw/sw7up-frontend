import { Directive, HostBinding, Input } from '@angular/core';
import { TColor } from '../../../types/color';


@Directive({
  selector: '[swButtonColor]'
})
export class ButtonColorDirective {
  @Input() hue = 500;
  @HostBinding('class') classes = `bg-indigo-${this.hue + 100} hover:bg-indigo-${this.hue + 200} focus:ring-indigo-${this.hue}`;

  constructor() { }

  @Input() set swButtonColor(color: TColor) {
    this.classes = `bg-${color}-${this.hue + 100} hover:bg-${color}-${this.hue + 200} focus:ring-${color}-${this.hue}`;
  }
}
