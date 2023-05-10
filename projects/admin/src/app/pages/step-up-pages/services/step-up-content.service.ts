import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IStepUpContent, StepUpService } from 'shared';

@Injectable()
export class StepUpContentService {
  readonly selected$: Observable<IStepUpContent>;
  readonly update$: Observable<void>;

  private readonly _selectedSubject: BehaviorSubject<IStepUpContent | null> = new BehaviorSubject<IStepUpContent | null>(null);
  private readonly _updateSubject: Subject<void> = new Subject<void>();

  constructor(private readonly _stepUpService: StepUpService) {
    this.selected$ = this._selectedSubject.asObservable();
    this.update$ = this._updateSubject.asObservable();
  }

  get selected(): IStepUpContent | null {
    return this._selectedSubject.value;
  }

  set selected(content: IStepUpContent | null) {
    this._selectedSubject.next(content);
  }

  update(): void {
    this._updateSubject.next();
  }

  getContents(subject: string): Observable<IStepUpContent[]> {
    return this._stepUpService.getContents(subject).pipe(map(res => res.data));
  }

  createContent(body: IStepUpContent): Observable<boolean> {
    return this._stepUpService.createContent(body).pipe(map(res => res.success));
  }

  updateContent(id: string, body: IStepUpContent): Observable<boolean> {
    return this._stepUpService.updateContent(id, body).pipe(map(res => res.success));
  }

  removeContent(id: string): Observable<void> {
    return this._stepUpService.removeContent(id).pipe(map(() => undefined));
  }
}
