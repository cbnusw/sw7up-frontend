import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BarChartData } from '../../../../features/statistics/components';
import { StatisticsService } from '../../../../services';

@Injectable()
export class LanguageStatisticsService {

  files$: Observable<BarChartData>;
  codes$: Observable<BarChartData>;
  comments$: Observable<BarChartData>;

  private _filesSubject: BehaviorSubject<BarChartData> = new BehaviorSubject<BarChartData>([]);
  private _codesSubject: BehaviorSubject<BarChartData> = new BehaviorSubject<BarChartData>([]);
  private _commentsSubject: BehaviorSubject<BarChartData> = new BehaviorSubject<BarChartData>([]);

  constructor(
    private _statisticsService: StatisticsService,
  ) {
    this.files$ = this._filesSubject.asObservable();
    this.codes$ = this._codesSubject.asObservable();
    this.comments$ = this._commentsSubject.asObservable();
    this._init();
  }

  private _init(): void {
    this._statisticsService.getMyLanguages().pipe(
      map(res => res.data)
    ).subscribe({
      next: data => {
        const { files, codes, comments } = data;
        this._filesSubject.next(files);
        this._codesSubject.next(codes);
        this._commentsSubject.next(comments);
      },
      error: console.error
    });
  }
}
