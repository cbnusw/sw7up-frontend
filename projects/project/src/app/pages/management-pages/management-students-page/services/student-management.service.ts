import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { IListResponse, IResponse, RequestBase } from 'shared';
import { environment } from '../../../../../environments/environment';

export interface ProfessorDto {
  no: string;
  name: string;
  department: string;
}

export interface StudentsDto {
  no: string;
  name: string;
  department: string;
  grade?: string | null;
  note?: string | null;
}

export interface RegisterStudentDto {
  professor: ProfessorDto;
  student: StudentsDto;
}

export interface ProfessorResponseDto {
  _id: string;
  no: string;
  name: string;
  department: string;
}

export interface StudentResponseDto {
  _id: string;
  no: string;
  name: string;
  department: string;
  grade: string | null;
  note: string | null;
  professor: ProfessorResponseDto;
}

export interface SearchStudentsQueryDto {
  department?: string | null;
  professorNo?: string | null;
  professorName?: string | null;
  studentNo?: string | null;
  studentName?: string | null;
}

type Params = {
  [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
};

@Injectable({
  providedIn: 'root'
})
export class StudentManagementService extends RequestBase {
  total = 0;
  params: Params = {};

  readonly documents$: Observable<StudentResponseDto[]>;
  readonly departments$: Observable<string[]>;
  readonly pending$: Observable<boolean>;

  private readonly _documentsSubject: BehaviorSubject<StudentResponseDto[]> = new BehaviorSubject<StudentResponseDto[]>([]);
  private readonly _departmentsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private readonly _pendingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private readonly _http: HttpClient) {
    super(environment.codeHost + '/managements/students');
    this.documents$ = this._documentsSubject.asObservable();
    this.departments$ = this._departmentsSubject.asObservable();
    this.pending$ = this._pendingSubject.asObservable();
    this._getDepartments();
  }

  get documents(): StudentResponseDto[] {
    return this._documentsSubject.value;
  }

  get length(): number {
    return this.documents.length;
  }

  get pending(): boolean {
    return this._pendingSubject.value;
  }

  search(query: SearchStudentsQueryDto): void {
    this.params = this._convertQueryToParams(query);
    this._search(this.params).subscribe({
      next: documents => this._documentsSubject.next(documents),
    });
  }

  more(): void {
    if (this.pending || this.total <= this.length) {
      return;
    }

    this._search({ ...this.params, skip: this.length }).subscribe({
      next: documents => this._documentsSubject.next([...this.documents, ...documents]),
    });
  }

  registerStudents(dto: RegisterStudentDto[], clear = false): Observable<any> {
    return (clear ? this._http.delete(this.url`/clear`) : of(null)).pipe(
      switchMap(() => this._http.post(this.url`/register`, dto)),
      switchMap(() => this._search({ ...this.params, limit: this.length, skip: 0 })),
      tap(() => this._getDepartments()),
      tap(documents => this._documentsSubject.next(documents)),
    );
  }

  removeStudent(id: string): Observable<any> {
    return this._http.delete(this.url`/${id}`).pipe(
      switchMap(() => this._search({ ...this.params, limit: this.length, skip: 0 })),
      tap(() => this._getDepartments()),
      tap(documents => this._documentsSubject.next(documents))
    );
  }

  private _search(params: Params): Observable<StudentResponseDto[]> {
    this._pendingSubject.next(true);
    return this._http.get<IListResponse<StudentResponseDto>>(this.url`/`, { params }).pipe(
      map(res => res.data),
      tap(({ total }) => this.total = total),
      map(({ documents }) => documents),
      finalize(() => this._pendingSubject.next(false))
    );
  }

  private _convertQueryToParams(query: SearchStudentsQueryDto): Params {
    const params: Params = { limit: 100 };
    Object.keys(query).forEach(key => {
      const value = query[key];
      if (!!value) {
        params[key] = value;
      }
    });
    return params;
  }

  private _getDepartments(): void {
    this._http.get<IResponse<string[]>>(this.url`/departments`).pipe(
      map(res => res.data)
    ).subscribe(departments => this._departmentsSubject.next(departments));
  }
}
