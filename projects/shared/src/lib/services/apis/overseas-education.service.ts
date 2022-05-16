import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBase } from '../../classes/api-base';
import { IOverseasEducation } from '../../models/overseas-education';
import { IParams } from '../../models/params';
import { IListResponse, IResponse } from '../../models/response';
import { SharedConfig } from '../../shared-config';

@Injectable({
  providedIn: 'root'
})
export class OverseasEducationService extends ApiBase {

  constructor(private http: HttpClient,
              config: SharedConfig) {
    super(config, '/overseas-education');
  }

  search(params?: IParams): Observable<IListResponse<IOverseasEducation>> {
    return this.http.get(this.url`/`, { params: ApiBase.params(params) });
  }

  getOverseasEducation(id: string): Observable<IResponse<IOverseasEducation>> {
    return this.http.get(this.url`/${id}`);
  }

  createOverseasEducation(body: IOverseasEducation): Observable<IResponse<IOverseasEducation>> {
    return this.http.post(this.url`/`, body);
  }

  updateOverseasEducation(id: string, body: IOverseasEducation): Observable<IResponse<undefined>> {
    return this.http.put(this.url`/${id}`, body);
  }

  removeOverseasEducation(id: string): Observable<IResponse<undefined>> {
    return this.http.delete(this.url`/${id}`);
  }
}
