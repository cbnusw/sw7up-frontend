import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private _hidden = false;

  constructor(router: Router) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => this.hidden = false);
  }

  set hidden(hidden: boolean) {
    setTimeout(() => this._hidden = hidden);
  }

  get hidden(): boolean {
    return this._hidden;
  }
}
