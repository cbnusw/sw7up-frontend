import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { IResponse, RequestBase } from 'shared';
import { environment } from '../../../../../environments/environment';
import { IProject } from '../../../../types';

export interface SearchReportQueryDto {
  startCreatedAt: Date | null;
  endCreatedAt: Date | null;
  startPerformedAt: string | null;
  endPerformedAt: string | null;
  startGrade: number | null;
  endGrade: number | null;
}

type Params = {
  [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
};

export interface TotalStat {
  projects: number;
  files: number;
  codes: number;
  comments: number;
}

export interface LanguageData {
  projects: number;
  files: number;
  codes: number;
  comments: number;
}

export interface Languages {
  [key: string]: LanguageData;
}

export interface ReportDto {
  total: TotalStat;
  languages: Languages;
  projects: IProject[];
}

@Injectable()
export class MyReportService extends RequestBase {
  params: Params = {};
  readonly pending$: Observable<boolean>;
  readonly report$: Observable<ReportDto | null>;

  private readonly _reportSubject: BehaviorSubject<ReportDto | null> = new BehaviorSubject<ReportDto | null>(null);
  private readonly _pendingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private readonly _http: HttpClient) {
    super(environment.codeHost + '/students/me/report');
    this.report$ = this._reportSubject.asObservable();
    this.pending$ = this._pendingSubject.asObservable();
  }

  get report(): ReportDto | null {
    return this._reportSubject.value;
  }

  get totalStat(): TotalStat {
    return this.report?.total || {
      projects: 0,
      files: 0,
      codes: 0,
      comments: 0,
    };
  }

  get languages(): Languages {
    return this.report?.languages || {};
  }

  get projects(): IProject[] {
    return this.report?.projects || [];
  }

  getReport(query: SearchReportQueryDto): void {
    this.params = this._convertQueryToParams(query);
    this._pendingSubject.next(true);
    this._http.get<IResponse<ReportDto>>(this.url`/`, { params: this.params }).pipe(
      map(res => res.data),
      finalize(() => this._pendingSubject.next(false))
    ).subscribe(report => this._reportSubject.next(report));
  }

  private _convertQueryToParams(query: SearchReportQueryDto): Params {
    const params: Params = {};
    Object.keys(query).forEach(key => {
      const value = query[key];
      if (!!value) {
        params[key] = value;
      }
    });

    if (params.startCreatedAt) {
      const day = dayjs(params.startCreatedAt as string);
      console.log(day.year(), day.month() + 1, day.date(), day.hour(), day.minute());
    }

    if (params.endCreatedAt) {
      const day = dayjs(params.endCreatedAt as string).add(1, 'days');
      params.endCreatedAt = day.toDate().toISOString();
    }
    return params;
  }
}
