import { Component, OnInit } from '@angular/core';
import { ChartDataService } from '../../services';

@Component({
  selector: 'sw-dashboard-chart',
  templateUrl: './dashboard-chart.component.html',
  styleUrls: ['./dashboard-chart.component.scss']
})
export class DashboardChartComponent implements OnInit {

  chartData = [
    {
      title: '학과별 프로젝트 수',
      data$: this.chartDataService.projects$
    },
    {
      title: '학과별 파일 수',
      data$: this.chartDataService.files$
    },
    {
      title: '학과별 코드라인 수',
      data$: this.chartDataService.codeLines$
    }
  ];

  constructor(
    public chartDataService: ChartDataService,
  ) { }

  ngOnInit(): void {
  }

}
