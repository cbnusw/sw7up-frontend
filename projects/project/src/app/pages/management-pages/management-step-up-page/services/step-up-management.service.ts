import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { IListResponse, IResponse, MAJORS, RequestBase } from 'shared';
import { environment } from '../../../../../environments/environment';
import { convertQueryToParams } from '../../../../tools';
import { Params, QueryConvertor, TPerformedSemester } from '../../../../types';

export interface SearchStepUpQueryDto {
  startPerformedAt: TPerformedSemester | null;
  endPerformedAt: TPerformedSemester | null;
  pass: boolean | null;
  level: number | null;
  departments: string[];
  no: string | null;
  name: string | null;
}

export interface StepUpSubject {
  name: string;
  score: number;
}

export interface RegisterStepUpDto {
  performedAt: TPerformedSemester;
  level: number;
  pass: boolean;
  department: string;
  no: string;
  grade: number;
  name: string;
  subjects: StepUpSubject[];
}

export interface StepUpResponseDto extends RegisterStepUpDto {
  _id: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class StepUpManagementService extends RequestBase implements QueryConvertor<SearchStepUpQueryDto> {
  total = 0;
  params: Params = {};

  readonly pending$: Observable<boolean>;
  readonly documents$: Observable<StepUpResponseDto[]>;
  readonly levels$: Observable<number[]>;

  private readonly _pendingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private readonly _documentsSubject: BehaviorSubject<StepUpResponseDto[]> = new BehaviorSubject<StepUpResponseDto[]>([]);
  private readonly _levelsSubject: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);

  constructor(private readonly _http: HttpClient) {
    super(environment.codeHost + '/managements/step-up');
    this.pending$ = this._pendingSubject.asObservable();
    this.documents$ = this._documentsSubject.asObservable();
    this.levels$ = this._levelsSubject.asObservable();
    this._getOptions();
  }

  get documents(): StepUpResponseDto[] {
    return this._documentsSubject.value;
  }

  get length(): number {
    return this.documents.length;
  }

  get pending(): boolean {
    return this._pendingSubject.value;
  }

  search(query: SearchStepUpQueryDto): void {
    this.params = convertQueryToParams(query, { limit: 100 });
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

  registerStepUpData(data: RegisterStepUpDto[], clear: boolean): Observable<any> {
    return this._http.post(this.url`/register`, { data, clear }).pipe(
      switchMap(() => this._search({ ...this.params, limit: this.length, skip: 0 })),
      tap(() => this._getOptions()),
      tap(documents => this._documentsSubject.next(documents))
    );
  }

  removeStepUp(id: string): Observable<any> {
    return this._http.delete(this.url`/${id}`).pipe(
      switchMap(() => this._search({ ...this.params, limit: this.length, skip: 0 })),
      tap(() => this._getOptions()),
      tap(documents => this._documentsSubject.next(documents))
    );
  }

  convertParamsToQuery(): SearchStepUpQueryDto {
    const {
      startPerformedAt = null,
      endPerformedAt = null,
      pass = null,
      level = null,
      departments = null,
      no = null,
      name = null,
    } = this.params;

    return {
      startPerformedAt,
      endPerformedAt,
      pass,
      level,
      departments: departments ? (departments as string).split(',') : [...MAJORS, '기타'],
      no,
      name,
    } as SearchStepUpQueryDto;
  }

  private _search(params: Params): Observable<StepUpResponseDto[]> {
    this._pendingSubject.next(true);
    return this._http.get<IListResponse<StepUpResponseDto>>(this.url`/`, { params }).pipe(
      map(res => res.data),
      tap(({ total }) => this.total = total),
      map(({ documents }) => documents),
      finalize(() => this._pendingSubject.next(false))
    );
  }

  private _getOptions(): void {
    this._getLevels();
  }

  private _getLevels(): void {
    this._http.get<IResponse<number[]>>(this.url`/levels`).pipe(
      map(res => res.data),
    ).subscribe(list => this._levelsSubject.next(list));
  }
}
