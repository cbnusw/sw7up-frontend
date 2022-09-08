import { Observable } from 'rxjs';

export abstract class CounterService {

  abstract projects$: Observable<number>;
  abstract files$: Observable<number>;
  abstract codeLines$: Observable<number>;

  protected constructor() {
  }
}
