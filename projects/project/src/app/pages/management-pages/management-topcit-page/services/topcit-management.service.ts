import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { IListResponse, IResponse, RequestBase } from 'shared';
import { environment } from '../../../../../environments/environment';

type Params = {
  [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
};

export interface SearchTopcitsQueryDto {
  no?: number | null;
  year?: number | null;
  level?: number | null;
  department?: string | null;
  grade?: string | null;
  studentNo?: string | null;
  studentName?: string | null;
}

export interface TopcitSubjectDto {
  name: string;
  score: number | null;
}

export interface TopcitStudentDto {
  department: string;
  grade: string;
  no: string;
  name: string;
}

export interface TopcitDto {
  no: number;
  year: number;
  student: TopcitStudentDto;
  level: number | null;
  totalScore: number | null;
  subjects: TopcitSubjectDto[];
}

export interface TopcitResponseDto extends TopcitDto {
  _id: string;
}

export interface ConvertedTopcitDto extends Omit<TopcitResponseDto, 'subjects'> {
  subjects: { [key: string]: number | null };
}

export interface RegisterTopcitDataDto {
  clear: boolean;
  no: number;
  data: TopcitDto[];
}

@Injectable({
  providedIn: 'root'
})
export class TopcitManagementService extends RequestBase {
  total = 0;
  params: Params = {};

  readonly pending$: Observable<boolean>;
  readonly documents$: Observable<ConvertedTopcitDto[]>;
  readonly years$: Observable<number[]>;
  readonly noList$: Observable<number[]>;
  readonly levels$: Observable<number[]>;
  readonly departments$: Observable<string[]>;
  readonly grades$: Observable<string[]>;
  readonly subjectNames$: Observable<string[]>;

  private readonly _pendingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private readonly _documentsSubject: BehaviorSubject<ConvertedTopcitDto[]> = new BehaviorSubject<ConvertedTopcitDto[]>([]);
  private readonly _yearsSubject: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  private readonly _noListSubject: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  private readonly _levelsSubject: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  private readonly _departmentsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private readonly _gradesSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private readonly _subjectNamesSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(private readonly _http: HttpClient) {
    super(environment.codeHost + '/managements/topcits');

    this.pending$ = this._pendingSubject.asObservable();
    this.documents$ = this._documentsSubject.asObservable();
    this.years$ = this._yearsSubject.asObservable();
    this.noList$ = this._noListSubject.asObservable();
    this.levels$ = this._levelsSubject.asObservable();
    this.departments$ = this._departmentsSubject.asObservable();
    this.grades$ = this._gradesSubject.asObservable();
    this.subjectNames$ = this._subjectNamesSubject.asObservable();
    this._getOptions();
  }

  get documents(): ConvertedTopcitDto[] {
    return this._documentsSubject.value;
  }

  get length(): number {
    return this.documents.length;
  }

  get pending(): boolean {
    return this._pendingSubject.value;
  }

  search(query: SearchTopcitsQueryDto): void {
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

  registerTopcitData(dto: RegisterTopcitDataDto): Observable<any> {
    return this._http.post(this.url`/register`, dto).pipe(
      tap(() => this._getOptions()),
      switchMap(() => this._search({ ...this.params, limit: this.length, skip: 0 }))
    );
  }

  removeTopcit(id: string): Observable<any> {
    return this._http.delete(this.url`/${id}`).pipe(
      switchMap(() => this._search({ ...this.params, limit: this.length, skip: 0 })),
      tap(() => this._getOptions()),
      tap(documents => this._documentsSubject.next(documents))
    );
  }

  private _search(params: Params): Observable<ConvertedTopcitDto[]> {
    this._pendingSubject.next(true);
    return this._http.get<IListResponse<TopcitResponseDto>>(this.url`/`, { params }).pipe(
      map(res => res.data),
      tap(({ total }) => this.total = total),
      map(({ documents }) => this._convert(documents)),
      tap(documents => this._emitSubjectNames(documents)),
      finalize(() => this._pendingSubject.next(false))
    );
  }

  private _convert(documents: TopcitResponseDto[]): ConvertedTopcitDto[] {
    return documents.map(document => ({
      ...document,
      subjects: document.subjects.reduce((acc, cur) => {
        acc[cur.name] = cur.score;
        return acc;
      }, {}),
    }));
  }

  private _emitSubjectNames(documents: ConvertedTopcitDto[]): void {
    const names: string[] = documents.reduce((acc, cur) => {
      acc = [...acc, ...Object.keys(cur.subjects)];
      return acc;
    }, []);
    this._subjectNamesSubject.next([...new Set(names)].sort());
  }

  private _getOptions(): void {
    this._getYears();
    this._getNoList();
    this._getLevels();
    this._getDepartments();
    this._getGrades();
  }

  private _getYears(): void {
    this._http.get<IResponse<number[]>>(this.url`/years`).pipe(
      map(res => res.data)
    ).subscribe(list => this._yearsSubject.next(list));
  }

  private _getNoList(): void {
    this._http.get<IResponse<number[]>>(this.url`/no-list`).pipe(
      map(res => res.data),
    ).subscribe(list => this._noListSubject.next(list));
  }

  private _getLevels(): void {
    this._http.get<IResponse<number[]>>(this.url`/levels`).pipe(
      map(res => res.data),
    ).subscribe(list => this._levelsSubject.next(list));
  }

  private _getDepartments(): void {
    this._http.get<IResponse<string[]>>(this.url`/departments`).pipe(
      map(res => res.data),
    ).subscribe(list => this._departmentsSubject.next(list));
  }

  private _getGrades(): void {
    this._http.get<IResponse<string[]>>(this.url`/grades`).pipe(
      map(res => res.data)
    ).subscribe(list => this._gradesSubject.next(list));
  }

  private _convertQueryToParams(query: SearchTopcitsQueryDto): Params {
    const params: Params = { limit: 100 };
    Object.keys(query).forEach(key => {
      const value = query[key];
      if (!!value) {
        params[key] = value;
      }
    });
    return params;
  }
}
