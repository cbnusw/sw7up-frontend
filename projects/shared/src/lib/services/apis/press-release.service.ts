import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBase } from '../../classes/api-base';
import { IParams } from '../../models/params';
import { IPressRelease } from '../../models/press-release';
import { IListResponse, IResponse } from '../../models/response';
import { SharedConfig } from '../../shared-config';

@Injectable({
  providedIn: 'root'
})
export class PressReleaseService extends ApiBase {

  constructor(private http: HttpClient,
              config: SharedConfig) {
    super(config, '/press-release');
  }

  search(params?: IParams): Observable<IListResponse<IPressRelease>> {
    return this.http.get(this.url`/`, { params: ApiBase.params(params) });
  }

  getPressRelease(id: string): Observable<IResponse<IPressRelease>> {
    return this.http.get(this.url`/${id}`);
  }

  createPressRelease(body: IPressRelease): Observable<IResponse<IPressRelease>> {
    return this.http.post(this.url`/`, body);
  }

  updatePressRelease(id: string, body: IPressRelease): Observable<IResponse<undefined>> {
    return this.http.put(this.url`/${id}`, body);
  }

  removePressRelease(id: string): Observable<IResponse<undefined>> {
    return this.http.delete(this.url`/${id}`);
  }
}
