import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBase } from '../../classes/api-base';
import { IParams } from '../../models/params';
import { IListResponse, IResponse } from '../../models/response';
import { IStudentActivity } from '../../models/student-activity';
import { SharedConfig } from '../../shared-config';

@Injectable({
  providedIn: 'root'
})
export class StudentActivityService extends ApiBase {

  constructor(private http: HttpClient,
              config: SharedConfig) {
    super(config, '/student-activity');
  }

  search(params?: IParams): Observable<IListResponse<IStudentActivity>> {
    return this.http.get(this.url`/`, { params: ApiBase.params(params) });
  }

  getStudentActivity(id: string): Observable<IResponse<IStudentActivity>> {
    return this.http.get(this.url`/${id}`);
  }

  createStudentActivity(body: IStudentActivity): Observable<IResponse<IStudentActivity>> {
    return this.http.post(this.url`/`, body);
  }

  updateStudentActivity(id: string, body: IStudentActivity): Observable<IResponse<undefined>> {
    return this.http.put(this.url`/${id}`, body);
  }

  removeStudentActivity(id: string): Observable<IResponse<undefined>> {
    return this.http.delete(this.url`/${id}`);
  }
}
