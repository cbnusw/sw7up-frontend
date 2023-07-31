import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResponse, RequestBase } from 'shared';
import { environment } from '../../../../environments/environment';
import { IProject } from '../../../types';

export interface ProjectsGroupByYear {
  year: number;
  projects: IProject[];
}

@Injectable()
export class StudentProjectService extends RequestBase {
  readonly data$: Observable<ProjectsGroupByYear[]>;
  private readonly _dataSubject: BehaviorSubject<ProjectsGroupByYear[]> = new BehaviorSubject<ProjectsGroupByYear[]>([]);

  constructor(private readonly _http: HttpClient) {
    super(environment.codeHost + '/projects/groupby/year/students');
    this.data$ = this._dataSubject.asObservable();
  }

  year$(year: number): Observable<IProject[]> {
    return this.data$.pipe(
      map(data => data.find(item => item.year === year) || { year, projects: [] }),
      map(item => item.projects),
    );
  }

  load(no: string): void {
    this._http.get<IResponse<ProjectsGroupByYear[]>>(this.url`/${no}`).pipe(
      map(res => res.data)
    ).subscribe(data => this._dataSubject.next(data));
  }
}
