import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestBase } from '../../classes/request-base';
import { IParams } from '../../models/params';
import { IProject } from '../../models/project';
import { IListResponse, IResponse } from '../../models/response';
import { SharedConfig } from '../../shared-config';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends RequestBase {

  constructor(private http: HttpClient,
              config: SharedConfig) {
    super(config.codeHost + '/project');
  }

  getProjects(params?: IParams): Observable<IListResponse<IProject>> {
    return this.http.get(this.url`/`, { params: ProjectService.params(params) });
  }

  countProjects(params?: IParams): Observable<IResponse<number>> {
    return this.http.get(this.url`/count`, { params: ProjectService.params(params) });
  }

  getGithubProjects(): Observable<IResponse<IProject[]>> {
    return this.http.get(this.url`/github`);
  }

  getMyProjects(params?: IParams): Observable<IListResponse<IProject>> {
    return this.http.get(this.url`/me`, { params: ProjectService.params(params) });
  }

  getProject(id: string): Observable<IResponse<IProject>> {
    return this.http.get(this.url`/${id}`);
  }

  addProject(project: IProject): Observable<IResponse<IProject>> {
    return this.http.post(this.url`/`, { project });
  }
}
