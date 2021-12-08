import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IListResponse, IParams, IResponse, IUserInfo, RequestBase } from 'shared';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends RequestBase {

  constructor(private http: HttpClient) {
    super(`${environment.codeHost}/accounts`);
  }

  searchAccounts(params?: IParams): Observable<IListResponse<IUserInfo>> {
    return this.http.get(this.url`/`, { params: RequestBase.params(params) });
  }

  getAccount(id: string): Observable<IResponse<IUserInfo>> {
    return this.http.get(this.url`/${id}`);
  }
}
