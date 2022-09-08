import { Component, Input, OnInit } from '@angular/core';
import { BarChartData } from '../../../statistics/components';
import { IProjectMeta } from '../../../../types';

@Component({
  selector: 'sw-project-meta-charts',
  templateUrl: './project-meta-charts.component.html',
  styleUrls: ['./project-meta-charts.component.scss']
})
export class ProjectMetaChartsComponent implements OnInit {

  files: BarChartData = [];
  codes: BarChartData = [];
  comments: BarChartData = [];

  constructor() {
  }

  @Input() set meta(meta: IProjectMeta[]) {
    this.files = (meta || []).map(item => ({ name: item.language, value: item.files }))
      .sort((item1, item2) => item2.value - item1.value);
    this.codes = (meta || []).map(item => ({ name: item.language, value: item.codes }))
      .sort((item1, item2) => item2.value - item1.value);
    this.comments = (meta || []).map(item => ({ name: item.language, value: item.comments }))
      .sort((item1, item2) => item2.value - item1.value);
  }

  ngOnInit(): void {
  }

}
