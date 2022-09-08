import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LineChartData } from '../../../../features/statistics/components';
import { StatisticsService } from '../../../../services';

@Injectable()
export class SemesterStatisticsService {
  data$: Observable<LineChartData[]>;

  private _dataSubject: BehaviorSubject<LineChartData[]> = new BehaviorSubject<LineChartData[]>([]);

  constructor(
    private _statService: StatisticsService
  ) {
    this.data$ = this._dataSubject.asObservable();
    this._init();
  }

  private _init(): void {
    this._statService.getMySemesters().pipe(
      map(res => res.data)
    ).subscribe({
      next: data => {
        const { projects, files, codes, comments } = data;
        this._dataSubject.next([
          [{ name: '프로젝트', series: projects }],
          [{ name: '파일', series: files }],
          [{ name: '코드라인', series: codes }],
          [{ name: '주석', series: comments }],
        ]);
      },
      error: console.error
    });
  }
}
