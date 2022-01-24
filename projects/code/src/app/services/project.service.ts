import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IListResponse, IParams, IResponse, RequestBase } from 'shared';
import { environment } from '../../environments/environment';
import { IGithubProject } from '../types/github-project';
import { IProject } from '../types/project';
import { IProjectFile } from '../types/project-file';

export declare type TProjectMetaName = 'files' | 'codes' | 'comments';

export interface IProjectMetaResponse {
  language: string;
  count: number;
}

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

  search(params?: IParams, isPublic?: boolean): Observable<IListResponse<IProject>> {
    params = params ?? {};
    if (isPublic !== undefined) {
      params.isPublic = isPublic;
    }
    return this.http.get(this.url`/`, { params: RequestBase.params(params) });
  }

  countProjects(params?: IParams, isPublic?: boolean): Observable<IResponse<number>> {
    params = params ?? {};
    if (isPublic !== undefined) {
      params.isPublic = isPublic;
    }
    return this.http.get(this.url`/count`, { params: RequestBase.params(params) });
  }

  countProjectMetaInfo(metaName: TProjectMetaName, isPublic?: boolean, groupByLanguage?: boolean)
    : Observable<IResponse<number | IProjectMetaResponse[]>> {
    const params: IParams = { metaName, isPublic, groupByLanguage };
    return this.http.get(this.url`/meta/count`, { params: RequestBase.params(params) });
  }

  searchMyProjects(params?: IParams, isPublic?: boolean): Observable<IListResponse<IProject>> {
    params = params ?? {};
    if (isPublic !== undefined) {
      params.isPublic = isPublic;
    }
    return this.http.get(this.url`/me`, { params: RequestBase.params(params) });
  }

  countMyProjects(params?: IParams, isPublic?: boolean): Observable<IResponse<number>> {
    params = params ?? {};
    if (isPublic !== undefined) {
      params.isPublic = isPublic;
    }
    return this.http.get(this.url`/me/count`);
  }

  countMyProjectMetaInfo(metaName: TProjectMetaName, isPublic?: boolean, groupByLanguage?: boolean)
    : Observable<IResponse<number | IProjectMetaResponse[]>> {
    const params: IParams = { metaName, isPublic, groupByLanguage };
    return this.http.get(this.url`/me/meta/count`, { params: RequestBase.params(params) });
  }

  getProject(id: string): Observable<IResponse<IProject>> {
    return this.http.get(this.url`/${id}`);
  }

  downloadProject(id: string): Observable<IResponse<IProject>> {
    return this.http.get(this.url`/${id}/download`);
  }

  getProjectCodeText(id: string): Observable<IResponse<{ name: string; path: string; source: string; }>> {
    return this.http.get(this.url`/${id}/source`);
  }

  createProject(body: IProject): Observable<IResponse<IProject>> {
    return this.http.post(this.url`/`, body);
  }

  createProjectId(): Observable<IResponse<string>> {
    return this.http.post(this.url`/id`, null);
  }

  updateProject(id: string, body: IProject): Observable<IResponse<IProject>> {
    return this.http.put(this.url`/${id}`, body);
  }

  approve(id: string): Observable<IResponse<{ approvedAt: Date; }>> {
    return this.http.patch(this.url`/${id}/approve`, null);
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

  updateLocalProject(id: string, body: IProject): Observable<IResponse<undefined>> {
    return this.http.put(this.url`/local/${id}`, body);
  }

  updateGithubProject(id: string, body: IProject): Observable<IResponse<undefined>> {
    return this.http.put(this.url`/public/${id}`, body);
  }

  removeProject(id: string): Observable<IResponse<undefined>> {
    return this.http.delete(this.url`/${id}`);
  }

  removeTemporarySources(id: string): Observable<IResponse<undefined>> {
    return this.http.delete(this.url`/${id}/temp-sources`);
  }
}
