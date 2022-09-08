import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BarChartData } from '../../../features/statistics/components';
import { StatisticsService } from '../../../services';

@Injectable()
export class ChartDataService {

  projects$: Observable<BarChartData>;
  files$: Observable<BarChartData>;
  codeLines$: Observable<BarChartData>;

  private _projectsSubject: BehaviorSubject<BarChartData> = new BehaviorSubject<BarChartData>([]);
  private _filesSubject: BehaviorSubject<BarChartData> = new BehaviorSubject<BarChartData>([]);
  private _codeLinesSubject: BehaviorSubject<BarChartData> = new BehaviorSubject<BarChartData>([]);

  constructor(
    private _statisticsService: StatisticsService
  ) {
    this.projects$ = this._projectsSubject.asObservable();
    this.files$ = this._filesSubject.asObservable();
    this.codeLines$ = this._codeLinesSubject.asObservable();
    this._init();
  }

  private _init(): void {
    this._statisticsService.getDepartments().pipe(
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
