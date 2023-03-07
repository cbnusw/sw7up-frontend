import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IListResponse, IProject } from 'shared';
import { environment } from '../../../../../environments/environment';
import { TOwnProjectType, TProjectType } from '../../../../types';

export interface ProjectManagementQuery {
  createdStart: Date | null;
  createdEnd: Date | null;
  grade: number | null;
  performedStart: `${number}-${number}` | null;
  performedEnd: `${number}-${number}` | null;
  creatorName: string | null;
  creatorNo: string | null;
  school: '충북대학교' | '기타' | null;
  departments: string[];
  projectType: TProjectType | null;
  subjectName: string | null;
  ownProjectType: TOwnProjectType | null;
  professor: string | null;
}

type Params = {
  [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
};

@Injectable({
  providedIn: 'root'
})
export class ProjectManagementService {
  total = 0;
  params: Params = {};
  readonly documents$: Observable<IProject[]>;
  readonly pending$: Observable<boolean>;

  private readonly _BASE_URL = environment.codeHost + '/managements/projects';
  // private readonly _BASE_URL = 'https://swcode.cbnu.ac.kr' + '/managements/projects';
  private readonly _documentsSubject = new BehaviorSubject<IProject[]>([]);
  private readonly _pendingSubject = new BehaviorSubject<boolean>(false);

  constructor(private _http: HttpClient) {
    this.documents$ = this._documentsSubject.asObservable();
    this.pending$ = this._pendingSubject.asObservable();
  }

  get documents(): IProject[] {
    return this._documentsSubject.value;
  }

  search(query: ProjectManagementQuery): void {
    this.params = this._convertQuery(query);
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

  convertParamToQuery(): ProjectManagementQuery {
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
      createdStart,
      createdEnd,
      grade,
      performedStart,
      performedEnd,
      creatorName,
      creatorNo,
      school,
      departments: departments ? departments.split(',') : [],
      projectType,
      subjectName,
      ownProjectType,
      professor,
    };
  }

  private _convertQuery(query: ProjectManagementQuery): Params {
    const params: { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>; } = {
      limit: 100,
    };

    Object.keys(query).forEach(key => {
      const value = query[key];
      if (Array.isArray(value) && value.length > 0) {
        params[key] = value.join(',');
      } else if (value !== null) {
        params[key] = value;
      }
    });
    return params;
  }
}
