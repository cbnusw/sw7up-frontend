import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBase } from '../../classes/api-base';
import { IParams } from '../../models/params';
import { IResource } from '../../models/resource';
import { IListResponse, IResponse } from '../../models/response';
import { SharedConfig } from '../../shared-config';

@Injectable({
  providedIn: 'root'
})
export class ResourceService extends ApiBase {

  constructor(private http: HttpClient,
              config: SharedConfig) {
    super(config, '/resource');
  }

  search(params?: IParams): Observable<IListResponse<IResource>> {
    return this.http.get(this.url`/`, { params: ApiBase.params(params) });
  }

  getResource(id: string): Observable<IResponse<IResource>> {
    return this.http.get(this.url`/${id}`);
  }

  createResource(body: IResource): Observable<IResponse<IResource>> {
    return this.http.post(this.url`/`, body);
  }

  updateResource(id: string, body: IResource): Observable<IResponse<undefined>> {
    return this.http.put(this.url`/${id}`, body);
  }

  removeResource(id: string): Observable<IResponse<undefined>> {
    return this.http.delete(this.url`/${id}`);
  }
}
