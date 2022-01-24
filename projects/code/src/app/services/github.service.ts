import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AuthService, IGithubAccount, IResponse, IUser, RequestBase, SharedConfig } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class GithubService extends RequestBase {

  accounts$: Observable<IGithubAccount[]>;
  private accountsSubject: BehaviorSubject<IGithubAccount[]> = new BehaviorSubject<IGithubAccount[]>([]);

  constructor(private http: HttpClient,
              private auth: AuthService,
              config: SharedConfig) {
    super(config.codeHost + '/github');

    this.accounts$ = this.accountsSubject.asObservable();
    this.init();
  }

  get accounts(): IGithubAccount[] {
    return this.accountsSubject.value;
  }

  getGithubKey(): Observable<IResponse<{ clientId: string; }>> {
    return this.http.get(this.url`/key`);
  }

  getMyGithubAccounts(): Observable<IResponse<IGithubAccount[]>> {
    return this.http.get<IResponse<IGithubAccount[]>>(this.url`/me`)
      .pipe(tap(res => this.accountsSubject.next(res.data)));
  }

  createGithubAccount(code: string): Observable<IResponse<IGithubAccount[]>> {
    return this.http.post(this.url`/`, { code }).pipe(
      switchMap(() => this.getMyGithubAccounts())
    );
  }

  removeGithubAccount(id: string): Observable<IResponse<IGithubAccount[]>> {
    return this.http.delete(this.url`/${id}`).pipe(
      switchMap(() => this.getMyGithubAccounts())
    );
  }

  private async init(): Promise<void> {
    const me: IUser = this.auth.me || await this.auth.me$.toPromise();
    if (me.role === 'student') {
      this.getMyGithubAccounts().subscribe();
    }
  }
}
