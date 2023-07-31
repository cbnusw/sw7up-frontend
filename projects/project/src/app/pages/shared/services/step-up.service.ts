import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ApiBase, IResponse, SharedConfig } from 'shared';

interface Level {
  _id: string;
  name: string;
}

interface Subject {
  _id: string;
  name: string;
  level: string;
}

interface Content {
  _id: string;
  subject: string;
  title: string;
}

export interface StepUpContent {
  _id: string;
  level: Level;
  subjects: Subject[];
  title: string;
}

@Injectable()
export class StepUpService extends ApiBase {
  constructor(private readonly _http: HttpClient,
              config: SharedConfig) {
    super(config, '/step-up');
  }

  private _getLevel(id: string): Observable<Level> {
    return this._http.get<IResponse<Level>>(this.url`/levels/${id}`).pipe(map(res => res.data));
  }

  // private _getSubject(id: string): Observable<Subject> {
  //   return this._http.get<IResponse<Subject>>(this.url`/subjects/${id}`).pipe(map(res => res.data));
  // }

  private _getStepUpSubjectSequence(id: string): Observable<Subject[]> {
    return this._http.get<IResponse<Subject[]>>(this.url`/subjects/${id}/sequence`).pipe(map(res => res.data));
  }

  getStepUpContents(tag: string): Observable<StepUpContent[]> {
    let contents: Content[] = [];
    let subjects: Array<Subject[]> = [];
    let levels: Level[] = [];
    let result: StepUpContent[] = [];
    return this._http.get<IResponse<Content[]>>(this.url`/contents`, { params: { tag } }).pipe(
      tap(res => contents = res.data),
      switchMap(() => forkJoin(contents.map(content => this._getStepUpSubjectSequence(content.subject)))),
      tap(res => subjects = res),
      switchMap(() => forkJoin(subjects.map(s => this._getLevel(s[0].level)))),
      tap(res => levels = res),
      map(() => result = contents.map((c, i) => ({
          _id: c._id,
          level: levels[i],
          subjects: subjects[i],
          title: c.title
        }))
      ));
  }
}
