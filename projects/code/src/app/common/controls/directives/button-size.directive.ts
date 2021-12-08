import { Directive, HostBinding, Input } from '@angular/core';

export declare type TButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Directive({
  selector: '[swButtonSize]'
})
export class ButtonSizeDirective {

  @HostBinding('class') classes = 'text-sm px-4 py-2';

  constructor() {
  }

  @Input() set pdmButtonSize(size: TButtonSize) {
    let textSize: string;
    let paddingX: string;
    let paddingY: string;

    switch (size) {
      case 'xs':
        [textSize, paddingX, paddingY] = ['text-xs', 'px-2.5', 'py-1.5'];
        break;
      case 'sm':
        [textSize, paddingX, paddingY] = ['text-sm', 'px-3', 'py-2'];
        break;
      case 'lg':
        [textSize, paddingX, paddingY] = ['text-base', 'px-4', 'py-2'];
        break;
      case 'xl':
        [textSize, paddingX, paddingY] = ['text-base', 'px-6', 'py-3'];
        break;
      default:
        [textSize, paddingX, paddingY] = ['text-sm', 'px-4', 'py-2'];
    }

    this.classes = [textSize, paddingX, paddingY].join(' ');
  }

}
