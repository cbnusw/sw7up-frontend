import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBase } from '../../classes/api-base';
import { IResponse } from '../../models/response';
import { IStepUpContent } from '../../models/step-up-content';
import { IStepUpLevel } from '../../models/step-up-level';
import { IStepUpSubject } from '../../models/step-up-subject';
import { SharedConfig } from '../../shared-config';

@Injectable({
  providedIn: 'root'
})
export class StepUpService extends ApiBase {
  constructor(private readonly _http: HttpClient,
              config: SharedConfig) {
    super(config, '/step-up');
  }

  getLevels(): Observable<IResponse<IStepUpLevel[]>> {
    return this._http.get(this.url`/levels`);
  }

  createLevel(name: string): Observable<IResponse<IStepUpLevel>> {
    return this._http.post(this.url`/levels`, { name });
  }

  reorderLevels(orderedItem: { id: string; order: number; }[]): Observable<IResponse<undefined>> {
    return this._http.post(this.url`/levels/reorder`, orderedItem);
  }

  updateLevel(id: string, name: string): Observable<IResponse<undefined>> {
    return this._http.patch(this.url`/levels/${id}/name`, { name });
  }

  removeLevel(id: string): Observable<IResponse<undefined>> {
    return this._http.delete(this.url`/levels/${id}`);
  }

  getSubjects(level: string, parent: string | null = null): Observable<IResponse<IStepUpSubject[]>> {
    const params = parent ? { level, parent } : { level };
    return this._http.get(this.url`/subjects`, { params });
  }

  getSubjectSequence(id: string): Observable<IResponse<IStepUpSubject[]>> {
    return this._http.get(this.url`/subjects/${id}/sequence`);
  }

  createSubject(name: string, level: string, parent: string | null): Observable<IResponse<IStepUpSubject>> {
    return this._http.post(this.url`/subjects`, { name, level, parent });
  }

  updateSubjectName(id: string, name: string): Observable<IResponse<undefined>> {
    return this._http.patch(this.url`/subjects/${id}/name`, { name });
  }

  removeSubject(id: string): Observable<IResponse<undefined>> {
    return this._http.delete(this.url`/subjects/${id}`);
  }

  getContents(subject: string): Observable<IResponse<IStepUpContent[]>> {
    const params = { subject };
    return this._http.get(this.url`/contents`, { params });
  }

  getContent(id: string): Observable<IResponse<IStepUpContent>> {
    return this._http.get(this.url`/contents${id}`);
  }

  createContent(body: IStepUpContent): Observable<IResponse<IStepUpContent>> {
    return this._http.post(this.url`/contents`, body);
  }

  updateContent(id: string, body: IStepUpContent): Observable<IResponse<undefined>> {
    return this._http.put(this.url`/contents/${id}`, body);
  }

  removeContent(id: string): Observable<IResponse<undefined>> {
    return this._http.delete(this.url`/contents/${id}`);
  }
}
