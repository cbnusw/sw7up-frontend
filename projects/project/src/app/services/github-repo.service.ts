import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map, retry, timeout } from 'rxjs/operators';
import { IResponse, RequestBase, SharedConfig } from 'shared';
import { IGithubRepo } from '../types';

@Injectable({
  providedIn: 'root',
})
export class GithubRepoService extends RequestBase {
  repos$: Observable<IGithubRepo[]>;
  pending$: Observable<boolean>;

  private _reposSubject: BehaviorSubject<IGithubRepo[]> = new BehaviorSubject<IGithubRepo[]>([]);
  private _pendingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _page = 0;
  private _accountId: string | null = null;
  private _limit = 10;
  private _hasMore = false;

  constructor(
    private _http: HttpClient,
    config: SharedConfig,
  ) {
    super(config.codeHost + '/github');
    this.repos$ = this._reposSubject.asObservable();
    this.pending$ = this._pendingSubject.asObservable();
  }

  get repos(): IGithubRepo[] {
    return this._reposSubject.value;
  }

  get pending(): boolean {
    return this._pendingSubject.value;
  }

  get accountId(): string | null {
    return this._accountId;
  }

  set accountId(accountId: string | null) {
    if (!accountId) {
      this._accountId = null;
      this._page = 0;
      this._hasMore = false;
      this._reposSubject.next([]);
    } else if (this._accountId !== accountId) {
      this._accountId = accountId;
      this._page = 1;
      this._hasMore = true;
      this._reposSubject.next([]);
      this._getGithubRepos();
    }
  }

  getMore(): void {
    if (!this._hasMore || this.pending) {
      return;
    }
    this._page++;
    this._getGithubRepos();
  }

  private _getGithubRepos(): void {
    this._pendingSubject.next(true);
    this._http.get<IResponse<IGithubRepo[]>>(
      this.url`/${this.accountId}/repos`,
      { params: { page: this._page, limit: this._limit } }
    ).pipe(
      timeout(5000),
      retry(5),
      map(res => res.data),
      finalize(() => this._pendingSubject.next(false))
    ).subscribe({
      next: repos => {
        this._reposSubject.next([...this.repos, ...repos]);
        this._hasMore = repos.length === this._limit;
      },
      error: err => console.error(err?.error?.code || err?.message),
    });
  }
}
