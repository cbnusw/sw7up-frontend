import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, retry, tap, timeout } from 'rxjs/operators';
import { IResponse, RequestBase, SharedConfig, StorageService } from 'shared';
import { IGithubAccount } from '../types';
import { RedirectRouterService } from './redirect-router.service';

@Injectable({
  providedIn: 'root'
})
export class GithubService extends RequestBase {

  accounts$: Observable<IGithubAccount[]>;

  private _accountsSubject: BehaviorSubject<IGithubAccount[]> = new BehaviorSubject<IGithubAccount[]>([]);

  constructor(
    private _http: HttpClient,
    private _redirectRouter: RedirectRouterService,
    private _storage: StorageService,
    private _router: Router,
    config: SharedConfig,
  ) {
    super(config.codeHost + '/github');
    this.accounts$ = this._accountsSubject.asObservable();
    this.search();
  }

  createGithubAccount(code: string): void {
    this._http.post(this.url`/`, { code }).pipe(
      timeout(5000),
      retry(5),
    ).subscribe(() => {
      this.search();
      this._redirectRouter.redirect();
    });
  }

  get accounts(): IGithubAccount[] {
    return this._accountsSubject.value;
  }

  addGithubAccount(): void {
    this._storage.redirectUrl = this._router.url;
    this.requestAuth();
  }

  requestAuth(): void {
    this._getGithubKey()
      .pipe(map(res => res.data))
      .subscribe(({ clientId }) => {
        location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}`;
      });
  }

  removeAccount(id: string): Observable<IResponse<undefined>> {
    return this._http.delete(this.url`/${id}`).pipe(
      timeout(5000),
      retry(5),
      tap(() => {
        const idx = this.accounts.findIndex(account => account._id === id);
        if (idx !== -1) {
          this._accountsSubject.next([...this.accounts.slice(0, idx), ...this.accounts.slice(idx + 1)]);
        }
      })
    );
  }

  search(): void {
    this._http.get<IResponse<IGithubAccount[]>>(this.url`/me`).pipe(
      timeout(5000),
      retry(5),
    ).subscribe(res => this._accountsSubject.next(res.data));
  }

  private _getGithubKey(): Observable<IResponse<{ clientId: string; }>> {
    return this._http.get(this.url`/key`).pipe(
      timeout(5000),
      retry(5),
    );
  }
}
