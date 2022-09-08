import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CounterService } from '../../../features/statistics/services';
import { StatisticsService } from '../../../services';

@Injectable()
export class MyProjectCounterService extends CounterService {
  projects$: Observable<number> = of(5);
  files$: Observable<number> = of(57);
  codeLines$: Observable<number> = of(1492);

  private _projectsSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _filesSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _codeLinesSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(
    private _statisticsService: StatisticsService,
  ) {
    super();
    this.projects$ = this._projectsSubject.asObservable();
    this.files$ = this._filesSubject.asObservable();
    this.codeLines$ = this._codeLinesSubject.asObservable();
    this._init();
  }

  private _init(): void {
    this._statisticsService.countMe().pipe(
      map(res => res.data)
    ).subscribe({
      next: data => {
        const { projects, files, codes } = data;
        this._projectsSubject.next(projects);
        this._filesSubject.next(files);
        this._codeLinesSubject.next(codes);
      },
    });
  }
}
