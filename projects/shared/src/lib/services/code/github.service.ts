import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestBase } from '../../classes/request-base';
import { IGithubAccount } from '../../models/github-account';
import { IResponse } from '../../models/response';
import { SharedConfig } from '../../shared-config';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class GithubService extends RequestBase {

  constructor(private http: HttpClient,
              private auth: AuthService,
              config: SharedConfig) {
    super(config.codeHost + '/github');
  }

  getGithubKey(): Observable<IResponse<{ clientId: string; }>> {
    return this.http.get(this.url`/key`);
  }

  getMyGithubAccount(): Observable<IResponse<IGithubAccount>> {
    return this.http.get<IResponse<IGithubAccount>>(this.url`/me`);
  }

  createGithubAccount(code: string): Observable<IResponse<IGithubAccount>> {
    return this.http.post<IResponse<IGithubAccount>>(this.url`/`, { code });
  }
}
