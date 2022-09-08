import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LineChartData } from '../../../../../features/statistics/components';
import { ISelectOption } from '../../../../../types';
import { SemesterStatisticsService } from '../../services/semester-statistics.service';

@Component({
  selector: 'sw-semester-charts',
  templateUrl: './semester-charts.component.html',
  styleUrls: ['./semester-charts.component.scss'],
  providers: [SemesterStatisticsService]
})
export class SemesterChartsComponent implements OnInit, OnDestroy {

  chartData: LineChartData[] = [];
  options: ISelectOption[] = [
    { viewValue: '프로젝트', value: 0 },
    { viewValue: '파일', value: 1 },
    { viewValue: '코드라인', value: 2 },
    { viewValue: '주석', value: 3 },
  ];
  selected = 0;

  private _subscription = new Subscription();

  constructor(
    private _semesterStatService: SemesterStatisticsService,
  ) {
  }

  ngOnInit(): void {
    this._subscription.add(
      this._semesterStatService.data$.subscribe(data => this.chartData = data)
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}
