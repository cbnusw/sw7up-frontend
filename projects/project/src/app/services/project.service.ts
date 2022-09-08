import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, timeout } from 'rxjs/operators';
import { IResponse, RequestBase, SharedConfig } from 'shared';
import { IGithubRepo, INotJoinedMember, IProject, IProjectDocument, IProjectFile, IProjectOss } from '../types';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends RequestBase {

  constructor(
    private _http: HttpClient,
    config: SharedConfig,
  ) {
    super(config.codeHost + '/projects');
  }

  applyUploadSourceFiles(id: string): Observable<IResponse<undefined>> {
    return this._http.patch(this.url`/${id}/source/apply-upload`, null).pipe(
      timeout(5000),
      retry(5),
    );
  }

  cloneProject(id: string, account: string, repo: IGithubRepo): Observable<IResponse<undefined>> {
    return this._http.patch(this.url`/${id}/source/clone`, { account, repo }).pipe(
      timeout(5000),
      retry(5),
    );
  }

  create(body: IProject): Observable<IResponse<IProject>> {
    return this._http.post(this.url`/`, body).pipe(
      timeout(5000),
      retry(5),
    );
  }

  getProject(id: string): Observable<IResponse<IProject>> {
    return this._http.get(this.url`/${id}`).pipe(
      timeout(5000),
      retry(5),
    );
  }

  getProjectSourceCode(id: string): Observable<IResponse<{ name: string; path: string; source: string; }>> {
    return this._http.get(this.url`/source-code/${id}`).pipe(
      timeout(5000),
      retry(5),
    );
  }

  updateBasic(id: string, body: IProject): Observable<IResponse<undefined>> {
    return this._http.patch(this.url`/${id}/basic`, body).pipe(
      timeout(5000),
      retry(5),
    );
  }

  uploadSourceFile(id: string, path: string, file: File): Observable<IResponse<undefined>> {
    const formData = new FormData();
    formData.append('file', file);
    return this._http.post(this.url`/${id}/source/${path}`, formData).pipe(
      timeout(5000),
      retry(5),
    );
  }

  uploadSlide(id: string, files: File[]): Observable<IResponse<IProjectFile[]>> {
    const formData = this._createFormDataWithFiles(files);
    return this._http.post(this.url`/${id}/banners`, formData).pipe(
      timeout(5000),
      retry(5),
    );
  }

  addVideoSlide(id: string, link: string): Observable<IResponse<undefined>> {
    return this._http.patch(this.url`/${id}/banners/video/add`, { link }).pipe(
      timeout(5000),
      retry(5),
    );
  }

  updateTeamName(id: string, name: string): Observable<IResponse<undefined>> {
    return this._http.patch(this.url`/${id}/team/name`, { name }).pipe(
      timeout(5000),
      retry(5),
    );
  }

  addJoinedTeamMember(id: string, memberId: string): Observable<IResponse<undefined>> {
    return this._http.patch(this.url`/${id}/team/joined/add`, { memberId }).pipe(
      timeout(5000),
      retry(5),
    );
  }

  removeJoinedTeamMember(id: string, memberId: string): Observable<IResponse<undefined>> {
    return this._http.patch(this.url`/${id}/team/joined/remove`, { memberId }).pipe(
      timeout(5000),
      retry(5),
    );
  }

  addGitHubMembers(id: string): Observable<IResponse<undefined>> {
    return this._http.patch(this.url`/${id}/team/github/add`, null).pipe(
      timeout(5000),
      retry(5),
    );
  }

  removeGitHubMember(id: string, memberId: string): Observable<IResponse<undefined>> {
    return this._http.patch(this.url`/${id}/team/github/remove`, { memberId }).pipe(
      timeout(5000),
      retry(5),
    );
  }

  addNotJoinedMember(id: string, member: INotJoinedMember): Observable<IResponse<undefined>> {
    return this._http.patch(this.url`/${id}/team/not-joined/add`, { member }).pipe(
      timeout(5000),
      retry(5),
    );
  }

  addOss(id: string, oss: IProjectOss): Observable<IResponse<undefined>> {
    return this._http.patch(this.url`/${id}/oss/add`, oss).pipe(
      timeout(5000),
      retry(5),
    );
  }

  removeOss(id: string, index: number): Observable<IResponse<undefined>> {
    return this._http.patch(this.url`/${id}/oss/remove`, { index }).pipe(
      timeout(5000),
      retry(5),
    );
  }

  removeNotJoinedMember(id: string, index: number): Observable<IResponse<undefined>> {
    return this._http.patch(this.url`/${id}/team/not-joined/remove`, { index }).pipe(
      timeout(5000),
      retry(5),
    );
  }

  addDocument(id: string, name: string, file: File): Observable<IResponse<IProjectDocument>> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('file', file);
    return this._http.post(this.url`/${id}/documents`, formData).pipe(
      timeout(5000),
      retry(5),
    );
  }

  removeDocument(id: string, index: number): Observable<IResponse<undefined>> {
    return this._http.patch(this.url`/${id}/documents/remove`, { index }).pipe(
      timeout(5000),
      retry(5),
    );
  }

  removeSourceFiles(id: string, fileIds: string[]): Observable<IResponse<undefined>> {
    return this._http.patch(this.url`/${id}/source/remove`, fileIds).pipe(
      timeout(5000),
      retry(5),
    );
  }

  removeBanner(id: string, index: number): Observable<IResponse<undefined>> {
    return this._http.patch(this.url`/${id}/banners/remove`, { index }).pipe(
      timeout(5000),
      retry(5),
    );
  }

  private _createFormDataWithFiles(files: File[]): FormData {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    return formData;
  }
}
