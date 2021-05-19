import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private hiddenSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);
  hidden$: Observable<boolean> = this.hiddenSubject.asObservable();
  open$: Observable<boolean> = this.hidden$.pipe(map(hidden => !hidden));

  constructor() {
  }

  set hidden(hidden: boolean) {
    this.hiddenSubject.next(hidden);
  }

  get hidden(): boolean {
    return this.hiddenSubject.value;
  }
}
