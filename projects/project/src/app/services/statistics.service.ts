import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, timeout } from 'rxjs/operators';
import { IResponse, RequestBase, SharedConfig } from 'shared';
import { BarChartData, LineChartSeries } from '../features/statistics/components';
import { IProject } from '../types';

export interface ICount {
  projects: number;
  files: number;
  codes: number;
  comments: number;
}

export interface IStatistics {
  projects?: BarChartData | LineChartSeries;
  files: BarChartData | LineChartSeries;
  codes: BarChartData | LineChartSeries;
  comments?: BarChartData | LineChartSeries;
}

@Injectable({
  providedIn: 'root'
})
export class StatisticsService extends RequestBase {
  constructor(
    private _http: HttpClient,
    config: SharedConfig
  ) {
    super(config.codeHost + '/statistics');
  }

  count(): Observable<IResponse<ICount>> {
    return this._http.get(this.url`/count`).pipe(
      timeout(5000),
      retry(5)
    );
  }

  countMe(): Observable<IResponse<ICount>> {
    return this._http.get(this.url`/count/me`).pipe(
      timeout(5000),
      retry(5),
    );
  }

  getDepartments(): Observable<IResponse<IStatistics>> {
    return this._http.get(this.url`/departments`).pipe(
      timeout(5000),
      retry(5),
    );
  }

  getMyLanguages(): Observable<IResponse<IStatistics>> {
    return this._http.get(this.url`/languages/me`).pipe(
      timeout(5000),
      retry(5),
    );
  }

  getMySemesters(): Observable<IResponse<IStatistics>> {
    return this._http.get(this.url`/semesters/me`).pipe(
      timeout(5000),
      retry(5),
    );
  }

  getMyProjectsByGrades(): Observable<IResponse<Array<IProject[]>>> {
    return this._http.get(this.url`/projects/grades/me`).pipe(
      timeout(5000),
      retry(5),
    );
  }
}
