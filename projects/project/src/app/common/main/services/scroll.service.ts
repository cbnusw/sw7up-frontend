import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService implements OnDestroy {

  scrollBottom$: Observable<boolean>;
  private _scrollBottomSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private readonly _eventListener: () => void;

  constructor() {
    this.scrollBottom$ = this._scrollBottomSubject.asObservable();
    this._eventListener = () => {
      if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 800)) {
        this._scrollBottomSubject.next(true);
      } else {
        this._scrollBottomSubject.next(false);
      }
    };

    window.addEventListener('scroll', this._eventListener);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this._eventListener);
  }
}
