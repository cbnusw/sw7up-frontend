import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CounterService } from '../../../features/statistics/services';
import { StatisticsService } from '../../../services';

@Injectable()
export class DashboardCounterService extends CounterService {

  projects$: Observable<number>;
  files$: Observable<number>;
  codeLines$: Observable<number>;

  private _projectsSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _filesSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _codeLineSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(
    private _statisticsService: StatisticsService
  ) {
    super();
    this.projects$ = this._projectsSubject.asObservable();
    this.files$ = this._filesSubject.asObservable();
    this.codeLines$ = this._codeLineSubject.asObservable();
    this._count();
  }

  private _count(): void {
    this._statisticsService.count().pipe(
      map(res => res.data),
    ).subscribe({
      next: data => {
        const { projects, files, codes } = data;
        this._projectsSubject.next(projects);
        this._filesSubject.next(files);
        this._codeLineSubject.next(codes);
      },
      error: console.error
    });
  }
}
