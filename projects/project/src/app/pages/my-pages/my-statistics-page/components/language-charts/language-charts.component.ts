import { Component, OnInit } from '@angular/core';
import { LanguageStatisticsService } from '../../services';

@Component({
  selector: 'sw-language-charts',
  templateUrl: './language-charts.component.html',
  styleUrls: ['./language-charts.component.scss'],
  providers: [LanguageStatisticsService]
})
export class LanguageChartsComponent implements OnInit {
  chartData = [
    {
      title: '언어별 파일 수',
      data$: this._languageStatService.files$
    },
    {
      title: '언어별 코드라인 수',
      data$: this._languageStatService.codes$
    },
    {
      title: '언어별 주석 수',
      data$: this._languageStatService.comments$
    }
  ];

  constructor(
    private _languageStatService: LanguageStatisticsService
  ) { }

  ngOnInit(): void {
  }

}
