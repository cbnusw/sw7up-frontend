import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map, retry, tap, timeout } from 'rxjs/operators';
import { IListResponse, IUserInfo, RequestBase, SharedConfig } from 'shared';

@Injectable()
export class AccountService extends RequestBase {
  accounts$: Observable<IUserInfo[]>;
  pending$: Observable<boolean>;

  private _accountsSubject: BehaviorSubject<IUserInfo[]> = new BehaviorSubject([]);
  private _pendingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _page = 1;
  private _keyword: string;
  private _total = 0;

  constructor(
    private _http: HttpClient,
    config: SharedConfig
  ) {
    super(config.codeHost + '/accounts');
    this.accounts$ = this._accountsSubject.asObservable();
    this.pending$ = this._pendingSubject.asObservable();
  }

  get keyword(): string {
    return this._keyword;
  }

  get accounts(): IUserInfo[] {
    return this._accountsSubject.value;
  }

  get pending(): boolean {
    return this._pendingSubject.value;
  }

  search(keyword: string): void {
    this._page = 1;
    this._total = 0;
    this._keyword = keyword;
    if (!keyword) {
      this._accountsSubject.next([]);
      return;
    }

    this._request().subscribe({
      next: documents => this._accountsSubject.next(documents),
      error: err => alert(`Error: ${err?.error?.code || err?.message}`)
    });
  }

  getMore(): void {
    if (!this.pending && this._total > this.accounts.length) {
      this._page++;
      this._request().subscribe({
        next: documents => this._accountsSubject.next([...this.accounts, ...documents]),
        error: err => alert(`Error: ${err?.error?.code || err?.message}`)
      });
    }
  }

  private _request(): Observable<IUserInfo[]> {
    this._pendingSubject.next(true);
    return this._http.get<IListResponse<IUserInfo>>(this.url`/`, {
      params: {
        q: `no,name,department=${this._keyword}`,
        page: this._page
      }
    }).pipe(
      timeout(5000),
      retry(5),
      map(res => res.data),
      tap(data => this._total = data.total),
      map(data => data.documents),
      finalize(() => this._pendingSubject.next(false)),
    );
  }
}
