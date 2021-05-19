import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBase } from '../../classes/api-base';
import { ICorruptionReport } from '../../models/corruption-report';
import { IParams } from '../../models/params';
import { IListResponse, IResponse } from '../../models/response';
import { SharedConfig } from '../../shared-config';

@Injectable({
  providedIn: 'root'
})
export class CorruptionReportService extends ApiBase {

  constructor(private http: HttpClient,
              config: SharedConfig) {
    super(config, '/corruption-report');
  }

  search(params?: IParams): Observable<IListResponse<ICorruptionReport>> {
    return this.http.get(this.url`/`, { params: ApiBase.params(params) });
  }

  getCorruptionReport(id: string): Observable<IResponse<ICorruptionReport>> {
    return this.http.get(this.url`/${id}`);
  }

  createCorruptionReport(body: ICorruptionReport): Observable<IResponse<ICorruptionReport>> {
    return this.http.post(this.url`/`, body);
  }

  addReply(id: string, content: string): Observable<IResponse<undefined>> {
    return this.http.post(this.url`/${id}/reply`, { content });
  }

  updateCorruptionReport(id: string, body: ICorruptionReport): Observable<IResponse<ICorruptionReport>> {
    return this.http.put(this.url`/${id}`, body);
  }

  updateReply(id: string, replyId: string, content: string): Observable<IResponse<undefined>> {
    return this.http.put(this.url`/${id}/reply/${replyId}`, { content });
  }

  removeCorruptionReport(id: string): Observable<IResponse<undefined>> {
    return this.http.delete(this.url`/${id}`);
  }

  removeReply(id: string, replyId: string): Observable<IResponse<undefined>> {
    return this.http.delete(this.url`/${id}/reply/${replyId}`);
  }
}
