import { Component, Input } from '@angular/core';

@Component({
  selector: 'sw-jewel-icon',
  templateUrl: './jewel-icon.component.html',
})
export class JewelIconComponent {
  @Input() svgClass = 'h-6 w-6';
  @Input() pathClass = 'fill-amber-500';
}
