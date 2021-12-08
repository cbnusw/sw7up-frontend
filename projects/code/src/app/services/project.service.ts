import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IListResponse, IParams, IResponse, RequestBase } from 'shared';
import { environment } from '../../environments/environment';
import { IGithubProject } from '../types/github-project';
import { ILocalProject } from '../types/local-project';
import { IProjectFile } from '../types/project-file';
import { IPublicProject } from '../types/public-project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends RequestBase {

  constructor(private http: HttpClient) {
    super(`${environment.codeHost}/projects`);
  }

  getGithubProjects(accountId: string): Observable<IResponse<IGithubProject[]>> {
    return this.http.get(this.url`/github/${accountId}`);
  }

  getLocalProjects(params?: IParams): Observable<IListResponse<ILocalProject>> {
    return this.http.get(this.url`/local`, { params: RequestBase.params(params) });
  }

  countLocalProjects(): Observable<IResponse<number>> {
    return this.http.get(this.url`/local/count`);
  }

  countLocalProjectFiles(): Observable<IResponse<number>> {
    return this.http.get(this.url`/local/files/count`);
  }

  countLocalProjectCodes(): Observable<IResponse<number>> {
    return this.http.get(this.url`/local/codes/count`);
  }

  countLocalProjectFilesByLanguages(): Observable<IResponse<any>> {
    return this.http.get(this.url`/local/language/files/count`);
  }

  countLocalProjectCodesByLanguages(): Observable<IResponse<any>> {
    return this.http.get(this.url`/local/language/codes/count`);
  }

  getMyLocalProjects(params?: IParams): Observable<IListResponse<ILocalProject>> {
    return this.http.get(this.url`/local/me`, { params: RequestBase.params(params) });
  }

  countMyLocalProjects(): Observable<IResponse<number>> {
    return this.http.get(this.url`/local/me/count`);
  }

  countMyLocalProjectFiles(): Observable<IResponse<number>> {
    return this.http.get(this.url`/local/me/files/count`);
  }

  countMyLocalProjectCodes(): Observable<IResponse<number>> {
    return this.http.get(this.url`/local/me/codes/count`);
  }

  countMyLocalProjectFilesByLanguages(): Observable<IResponse<any>> {
    return this.http.get(this.url`/local/me/language/files/count`);
  }

  countMyLocalProjectCodesByLanguages(): Observable<IResponse<any>> {
    return this.http.get(this.url`/local/me/language/codes/count`);
  }

  getLocalProject(id: string): Observable<IResponse<ILocalProject>> {
    return this.http.get(this.url`/local/${id}`);
  }

  getPublicProjects(params?: IParams): Observable<IListResponse<IPublicProject>> {
    return this.http.get(this.url`/public`, { params: RequestBase.params(params) });
  }

  getMyPublicProjects(params?: IParams): Observable<IListResponse<IPublicProject>> {
    return this.http.get(this.url`/public/me`, { params: RequestBase.params(params) });
  }

  getPublicProject(id: string): Observable<IResponse<ILocalProject>> {
    return this.http.get(this.url`/public/${id}`);
  }

  createProjectId(): Observable<IResponse<string>> {
    return this.http.post(this.url`/id`, null);
  }

  createLocalProject(body: ILocalProject): Observable<IResponse<ILocalProject>> {
    return this.http.post(this.url`/local`, body);
  }

  createPublicProject(body: IPublicProject): Observable<IResponse<IPublicProject>> {
    return this.http.post(this.url`/public`, body);
  }

  uploadProjectBanner(id: string, file: File | Blob, filename?: string): Observable<IResponse<IProjectFile>> {
    const formData = new FormData();
    if (filename) {
      formData.append('file', file, filename);
    } else {
      formData.append('file', file);
    }
    return this.http.post(this.url`/${id}/banners`, formData);
  }

  uploadProjectDocument(id: string, file: File): Observable<IResponse<IProjectFile>> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(this.url`/${id}/documents`, formData);
  }

  uploadProjectSource(id: string, file: File, dirPath: string): Observable<IResponse<IProjectFile>> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(this.url`/${id}/sources/${dirPath}`, formData);
  }

  updateLocalProject(id: string, body: ILocalProject): Observable<IResponse<undefined>> {
    return this.http.put(this.url`/local/${id}`, body);
  }

  updateGithubProject(id: string, body: IPublicProject): Observable<IResponse<undefined>> {
    return this.http.put(this.url`/public/${id}`, body);
  }

  removeLocalProject(id: string): Observable<IResponse<undefined>> {
    return this.http.delete(this.url`/local/${id}`);
  }

  removePublicProject(id: string): Observable<IResponse<undefined>> {
    return this.http.delete(this.url`/public/${id}`);
  }
}
