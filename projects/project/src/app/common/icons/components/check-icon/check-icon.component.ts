import { Component, Input } from '@angular/core';

@Component({
  selector: 'sw-check-icon',
  template: `
    <svg xmlns="http://www.w3.org/2000/svg"
         fill="none"
         viewBox="0 0 24 24"
         [attr.stroke-width]="strokeWidth"
         stroke="currentColor"
         [class]="svgClass">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  `
})
export class CheckIconComponent {
  @Input() svgClass = 'h-6 w-6';
  @Input() strokeWidth = '1.5';
}
