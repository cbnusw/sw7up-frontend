import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IStepUpSubject, StepUpService } from 'shared';

@Injectable()
export class StepUpSubjectService {

  readonly selected$: Observable<IStepUpSubject | null>;
  private readonly _selectedSubject: BehaviorSubject<IStepUpSubject | null> = new BehaviorSubject<IStepUpSubject | null>(null);

  constructor(private readonly _stepUpService: StepUpService) {
    this.selected$ = this._selectedSubject.asObservable();
  }

  get selected(): IStepUpSubject | null {
    return this._selectedSubject.value;
  }

  set selected(subject: IStepUpSubject | null) {
    this._selectedSubject.next(subject);
  }

  getSubjects(level: string, parent: string | null = null): Observable<IStepUpSubject[]> {
    return this._stepUpService.getSubjects(level, parent).pipe(
      map(res => res.data),
    );
  }

  getSubjectSequence(id: string): Observable<IStepUpSubject[]> {
    return this._stepUpService.getSubjectSequence(id).pipe(
      map(res => res.data)
    );
  }

  createSubject(name: string, level: string, parent: string | null): Observable<undefined> {
    return this._stepUpService.createSubject(name, level, parent).pipe(map(() => undefined));
  }

  updateSubjectName(id: string, name: string): Observable<undefined> {
    return this._stepUpService.updateSubjectName(id, name).pipe(map(res => res.data));
  }

  removeSubject(id: string): Observable<undefined> {
    return this._stepUpService.removeSubject(id).pipe(map(res => res.data));
  }
}
