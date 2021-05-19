import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBase } from '../../classes/api-base';
import { INewsletter } from '../../models/newsletter';
import { IParams } from '../../models/params';
import { IListResponse, IResponse } from '../../models/response';
import { SharedConfig } from '../../shared-config';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService extends ApiBase {

  constructor(private http: HttpClient,
              config: SharedConfig) {
    super(config, '/newsletter');
  }

  search(params?: IParams): Observable<IListResponse<INewsletter>> {
    return this.http.get(this.url`/`, { params: ApiBase.params(params) });
  }

  getNewsletter(id: string): Observable<IResponse<INewsletter>> {
    return this.http.get(this.url`/${id}`);
  }

  createNewsletter(body: INewsletter): Observable<IResponse<INewsletter>> {
    const { title, yearMonth, file } = body;
    const formData = new FormData();

    formData.append('title', title);
    formData.append('yearMonth', yearMonth);
    formData.append('file', file);

    return this.http.post(this.url`/`, formData);
  }

  removeNewsletter(id: string): Observable<IResponse<undefined>> {
    return this.http.delete(this.url`/${id}`);
  }
}
