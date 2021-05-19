import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBase } from '../../classes/api-base';
import { IParams } from '../../models/params';
import { IQna } from '../../models/qna';
import { IListResponse, IResponse } from '../../models/response';
import { SharedConfig } from '../../shared-config';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class QnaService extends ApiBase {

  constructor(private http: HttpClient,
              private auth: AuthService,
              config: SharedConfig) {
    super(config, '/qna');
  }

  search(params?: IParams): Observable<IListResponse<IQna>> {
    return this.http.get(this.url`/`, { params: ApiBase.params(params) });
  }

  getQnA(id: string, password?: string): Observable<IResponse<IQna>> {
    if (this.auth.loggedIn) {
      return this.http.get(this.url`/${id}`);
    }
    return this.http.post(this.url`/${id}`, { password });
  }

  createQnA(body: IQna): Observable<IResponse<IQna>> {
    return this.http.post(this.url`/`, body);
  }

  addReply(id: string, content: string, password?: string): Observable<IResponse<undefined>> {
    const body = this.auth.loggedIn ? { content } : { content, password };
    return this.http.post(this.url`/${id}/reply`, body);
  }

  checkPassword(id: string, password: string): Observable<IResponse<undefined>> {
    return this.http.post(this.url`/${id}/password`, { password });
  }

  updateQnA(id: string, body: IQna): Observable<IResponse<undefined>> {
    return this.http.put(this.url`/${id}`, body);
  }

  updateReply(id: string, replyId: string, content: string, password?: string): Observable<IResponse<undefined>> {
    const body = this.auth.loggedIn ? { content } : { content, password };
    return this.http.put(this.url`/${id}/reply/${replyId}`, body);
  }

  confirm(id: string, confirm: boolean): Observable<IResponse<undefined>> {
    return this.http.patch(this.url`/${id}/confirm`, { confirm });
  }

  removeQnA(id: string, password?: string): Observable<IResponse<undefined>> {
    if (this.auth.loggedIn) {
      return this.http.delete(this.url`/${id}`);
    }
    return this.http.post(this.url`/${id}/remove`, { password });
  }

  removeReply(id: string, replyId: string, password?: string): Observable<IResponse<undefined>> {
    if (this.auth.loggedIn) {
      return this.http.delete(this.url`/${id}/reply/${replyId}`);
    }
    return this.http.post(this.url`/${id}/reply/${replyId}/remove`, { password });
  }
}
