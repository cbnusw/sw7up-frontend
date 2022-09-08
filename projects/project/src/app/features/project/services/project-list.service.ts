import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, retry, timeout } from 'rxjs/operators';
import { IListResponse } from 'shared';
import { environment } from '../../../../environments/environment';
import { IProject } from '../../../types';

export type Params = HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>; };

export const PROJECT_LIST_API_PATH = new InjectionToken('PROJECT_LIST_API_URL');

@Injectable()
export class ProjectListService {
  readonly DEFAULT_SORT = '_id:-1';
  pending$: Observable<boolean>;
  projects$: Observable<IProject[]>;
  total = 0;
  params: Params = {
    sort: this.DEFAULT_SORT,
  };

  private _projectsSubject: BehaviorSubject<IProject[]> = new BehaviorSubject<IProject[]>([]);
  private _pendingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _url: string;

  constructor(
    private _http: HttpClient,
    @Inject(PROJECT_LIST_API_PATH) path: string,
  ) {
    this._url = environment.codeHost + '/projects' + path;
    this.pending$ = this._pendingSubject.asObservable();
    this.projects$ = this._projectsSubject.asObservable();
  }

  get pending(): boolean {
    return this._pendingSubject.value;
  }

  get projects(): IProject[] {
    return this._projectsSubject.value;
  }

  set keyword(keyword: string) {
    this.params = { sort: this.DEFAULT_SORT };
    keyword = (keyword || '').trim();

    if (keyword) {
      (this.params as any).q = keyword;
    } else {
      delete (this.params as any).q;
    }
    this.search();
  }

  getMore(): void {
    if (this.pending || this.projects.length >= this.total) {
      return;
    }

    const last = this.projects[this.projects.length - 1];

    (this.params as any).sort = `_id:-1:${last._id}`;

    this._pendingSubject.next(true);
    this._http.get<IListResponse<IProject>>(this._url, { params: this.params })
      .pipe(
        timeout(5000),
        retry(5),
        finalize(() => this._pendingSubject.next(false))
      )
      .subscribe(res => {
        const { total, documents } = res.data;
        this.total = total;
        console.log(total, documents);
        this._projectsSubject.next([...this.projects, ...documents]);
      });
  }

  search(): void {
    this._pendingSubject.next(true);
    this._http.get<IListResponse<IProject>>(this._url, { params: this.params }).pipe(
      timeout(5000),
      retry(5),
      finalize(() => this._pendingSubject.next(false))
    ).subscribe(res => {
      const { total, documents } = res.data;
      this.total = total;
      this._projectsSubject.next(documents);
    });
  }
}
