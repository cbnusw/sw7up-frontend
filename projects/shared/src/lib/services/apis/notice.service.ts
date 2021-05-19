import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBase } from '../../classes/api-base';
import { INotice } from '../../models/notice';
import { IParams } from '../../models/params';
import { IListResponse, IResponse } from '../../models/response';
import { SharedConfig } from '../../shared-config';

@Injectable({
  providedIn: 'root'
})
export class NoticeService extends ApiBase {

  constructor(private http: HttpClient,
              config: SharedConfig) {
    super(config, '/notice');
  }

  search(params?: IParams): Observable<IListResponse<INotice>> {
    return this.http.get(this.url`/`, { params: ApiBase.params(params) });
  }

  getNotice(id: string): Observable<IResponse<INotice>> {
    return this.http.get(this.url`/${id}`);
  }

  createNotice(body: INotice): Observable<IResponse<INotice>> {
    return this.http.post(this.url`/`, body);
  }

  updateNotice(id: string, body: INotice): Observable<IResponse<undefined>> {
    return this.http.put(this.url`/${id}`, body);
  }

  removeNotice(id: string): Observable<IResponse<undefined>> {
    return this.http.delete(this.url`/${id}`);
  }
}
