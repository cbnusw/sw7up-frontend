import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IListResponse, IProject, MAJORS } from 'shared';
import { environment } from '../../../../../environments/environment';
import { convertQueryToParams } from '../../../../tools';
import { Params, QueryConvertor, TOwnProjectType, TProjectPerformedAt, TProjectType } from '../../../../types';

export interface ProjectManagementQuery {
  startCreatedAt: Date | string | null;
  endCreatedAt: Date | string | null;
  grade: number | null;
  startPerformedAt: TProjectPerformedAt | null;
  endPerformedAt: TProjectPerformedAt | null;
  creatorName: string | null;
  creatorNo: string | null;
  school: '충북대학교' | '기타' | null;
  departments: string[];
  projectType: TProjectType | null;
  subjectName: string | null;
  ownProjectType: TOwnProjectType | null;
  professor: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectManagementService implements QueryConvertor<ProjectManagementQuery> {
  total = 0;
  params: Params = {};
  readonly documents$: Observable<IProject[]>;
  readonly pending$: Observable<boolean>;

  private readonly _BASE_URL = environment.codeHost + '/managements/projects';
  private readonly _documentsSubject = new BehaviorSubject<IProject[]>([]);
  private readonly _pendingSubject = new BehaviorSubject<boolean>(false);

  constructor(private _http: HttpClient) {
    this.documents$ = this._documentsSubject.asObservable();
    this.pending$ = this._pendingSubject.asObservable();
  }

  get pending(): boolean {
    return this._pendingSubject.value;
  }

  get documents(): IProject[] {
    return this._documentsSubject.value;
  }

  search(query: ProjectManagementQuery): void {
    this.params = convertQueryToParams(query, { limit: 100 });
    this.params.skip = 0;
    this._pendingSubject.next(true);
    this.total = 0;
    this._documentsSubject.next([]);
    this._http.get<IListResponse<IProject>>(this._BASE_URL, { params: this.params }).pipe(
      finalize(() => this._pendingSubject.next(false))
    ).subscribe(res => {
      this.total = res.data.total;
      this._documentsSubject.next(res.data.documents);
    });
  }

  more(): void {
    this.params.skip = this.documents.length;
    this._pendingSubject.next(true);
    this._http.get<IListResponse<IProject>>(this._BASE_URL, { params: this.params }).pipe(
      finalize(() => this._pendingSubject.next(false))
    ).subscribe(res => {
      this.total = res.data.total;
      this._documentsSubject.next([...this.documents, ...res.data.documents]);
    });
  }

  downloadExcel(): Observable<Blob> {
    const { limit, skip, ...params } = this.params;
    return this._http.get(this._BASE_URL + '/download', { params, responseType: 'blob' });
  }

  convertParamsToQuery(): ProjectManagementQuery {
    const {
      createdStart = null,
      createdEnd = null,
      grade = null,
      performedStart = null,
      performedEnd = null,
      creatorName = null,
      creatorNo = null,
      school = null,
      departments = null,
      projectType = null,
      subjectName = null,
      ownProjectType = null,
      professor = null,
    } = this.params as any;
    return {
      startCreatedAt: createdStart,
      endCreatedAt: createdEnd,
      grade,
      startPerformedAt: performedStart,
      endPerformedAt: performedEnd,
      creatorName,
      creatorNo,
      school,
      departments: departments ? departments.split(',') : [...MAJORS, '기타'],
      projectType,
      subjectName,
      ownProjectType,
      professor,
    };
  }
}
