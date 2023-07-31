import { Component, HostBinding, Input } from '@angular/core';
import { FILTER_LABEL_BASIS } from '../constants';

@Component({
  selector: 'sw-filter-label',
  template: `<ng-content></ng-content>`,
  styles: [`:host { @apply block flex-shrink-0; }`]
})
export class FilterLabelComponent {
  @Input() label: string;
  @Input() @HostBinding('style.flex-basis') basis = FILTER_LABEL_BASIS;
}
