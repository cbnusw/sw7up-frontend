import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IListResponse, IParams, IResponse, RequestBase } from 'shared';
import { environment } from '../../environments/environment';
import { ILanguageFilter, IProjectLanguage } from '../types/language';


@Injectable({
  providedIn: 'root'
})
export class LanguageService extends RequestBase {

  constructor(private http: HttpClient) {
    super(`${environment.codeHost}/languages`);
  }

  getProjectLanguages(filter: boolean): Observable<IResponse<IProjectLanguage[]>> {
    return this.http.get(this.url`/projects`, { params: { filter } });
  }

  searchFilters(params?: IParams): Observable<IListResponse<ILanguageFilter>> {
    return this.http.get(this.url`/filters`, { params: RequestBase.params(params) });
  }

  createFilter(name: string): Observable<IResponse<ILanguageFilter>> {
    return this.http.post(this.url`/filters`, { name });
  }

  removeFilter(id: string): Observable<IResponse<undefined>> {
    return this.http.delete(this.url`/filters/${id}`);
  }
}
