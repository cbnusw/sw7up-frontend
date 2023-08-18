import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResponse, RequestBase, SharedConfig } from 'shared';
import { toCodingLevel } from '../common/utils';
import { CodingLevel, ProjectCodes } from '../types';

@Injectable({
  providedIn: 'root'
})
export class MyCodingLevelService extends RequestBase {
  readonly codingLevel$: Observable<CodingLevel | null>;

  private readonly _codingLevelSubject: BehaviorSubject<CodingLevel | null> = new BehaviorSubject<CodingLevel | null>(null);

  constructor(private readonly _http: HttpClient, config: SharedConfig) {
    super(config.codeHost + '/stats');
    this.codingLevel$ = this._codingLevelSubject.asObservable();
    this.load();
  }

  get codingLevel(): CodingLevel | null {
    return this._codingLevelSubject.value;
  }

  load(): void {
    this._http.get<IResponse<ProjectCodes[]>>(this.url`/me/coding-level`).pipe(
      map(res => {
        const projects = res.data;
        return toCodingLevel(projects);
      })
    ).subscribe(clv => this._codingLevelSubject.next(clv));
  }
}
