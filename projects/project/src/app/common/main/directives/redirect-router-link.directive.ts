import { Directive, HostListener, Input } from '@angular/core';
import { RedirectRouterService } from '../../../services';

@Directive({
  selector: '[swRedirectRouterLink]'
})
export class RedirectRouterLinkDirective {

  @Input() swRedirectRouterLink: any[] | string;

  @HostListener('click', ['$event']) handleClick(event): void {
    event.stopPropagation();
    event.preventDefault();

    if (typeof this.swRedirectRouterLink === 'string') {
      this._redirectRouter.navigateByUrl(this.swRedirectRouterLink);
    } else {
      this._redirectRouter.navigateByUrl(this.swRedirectRouterLink.join('/'));
    }
  }

  constructor(
    private _redirectRouter: RedirectRouterService,
  ) {
  }
}
