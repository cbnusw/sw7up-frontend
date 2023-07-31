import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { IListResponse, IResponse, RequestBase } from 'shared';
import { environment } from '../../../../../environments/environment';
import { convertQueryToParams } from '../../../../tools';
import { Params } from '../../../../types';

export interface SearchTopcitStatsQueryDto {
  category?: string | null;
  year?: number | null;
  no?: number | null;
}

export interface TopcitSubjectDto {
  name: string;
  score: number | null;
}

export interface TopcitStatDto {
  category: string;
  year: number;
  no: number;
  totalScore: number | null;
  subjects: TopcitSubjectDto[];
}

export interface TopcitStatResponseDto extends TopcitStatDto {
  _id: string;
}

export interface ConvertedTopcitStatDto extends Omit<TopcitStatResponseDto, 'subjects'> {
  subjects: { [key: string]: number | null };
}

export interface RegisterTopcitStatDataDto {
  clear: boolean;
  no: number;
  data: TopcitStatDto[];
}

@Injectable({
  providedIn: 'root'
})
export class TopcitStatManagementService extends RequestBase {
  total = 0;
  params: Params = {};

  readonly pending$: Observable<boolean>;
  readonly documents$: Observable<ConvertedTopcitStatDto[]>;
  readonly categories$: Observable<string[]>;
  readonly years$: Observable<number[]>;
  readonly noList$: Observable<number[]>;
  readonly subjectNames$: Observable<string[]>;

  private readonly _pendingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private readonly _documentsSubject: BehaviorSubject<ConvertedTopcitStatDto[]> = new BehaviorSubject<ConvertedTopcitStatDto[]>([]);
  private readonly _categoriesSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private readonly _yearsSubject: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  private readonly _noListSubject: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  private readonly _subjectNamesSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(private readonly _http: HttpClient) {
    super(environment.codeHost + '/managements/topcit-stats');

    this.pending$ = this._pendingSubject.asObservable();
    this.documents$ = this._documentsSubject.asObservable();
    this.categories$ = this._categoriesSubject.asObservable();
    this.years$ = this._yearsSubject.asObservable();
    this.noList$ = this._noListSubject.asObservable();
    this.subjectNames$ = this._subjectNamesSubject.asObservable();
    this._getOptins();
  }

  get documents(): ConvertedTopcitStatDto[] {
    return this._documentsSubject.value;
  }

  get length(): number {
    return this.documents.length;
  }

  get pending(): boolean {
    return this._pendingSubject.value;
  }

  search(query: SearchTopcitStatsQueryDto): void {
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

  registerTopcitStatData(dto: RegisterTopcitStatDataDto): Observable<any> {
    return this._http.post(this.url`/register`, dto).pipe(
      switchMap(() => this._search({ ...this.params, limit: this.length, skip: 0 })),
      tap(() => this._getOptins()),
      tap(documents => this._documentsSubject.next(documents)),
    );
  }

  removeTopcitStat(id: string): Observable<any> {
    return this._http.delete(this.url`/${id}`).pipe(
      switchMap(() => this._search({ ...this.params, limit: this.length, skip: 0 })),
      tap(() => this._getOptins()),
      tap(documents => this._documentsSubject.next(documents))
    );
  }

  private _search(params: Params): Observable<ConvertedTopcitStatDto[]> {
    this._pendingSubject.next(true);
    return this._http.get<IListResponse<TopcitStatResponseDto>>(this.url`/`, { params }).pipe(
      map(res => res.data),
      tap(({ total }) => this.total = total),
      map(({ documents }) => this._convert(documents)),
      tap(documents => this._emitSubjectNames(documents)),
      finalize(() => this._pendingSubject.next(false))
    );
  }

  private _convert(documents: TopcitStatResponseDto[]): ConvertedTopcitStatDto[] {
    return documents.map(document => ({
      ...document,
      subjects: document.subjects.reduce((acc, cur) => {
        acc[cur.name] = cur.score;
        return acc;
      }, {})
    }));
  }

  private _emitSubjectNames(documents: ConvertedTopcitStatDto[]): void {
    const names: string[] = documents.reduce((acc, cur) => {
      acc = [...acc, ...Object.keys(cur.subjects)];
      return acc;
    }, []);
    this._subjectNamesSubject.next([...new Set(names)].sort());
  }

  private _getOptins(): void {
    this._getCategories();
    this._getYears();
    this._getNoList();
  }

  private _getCategories(): void {
    this._http.get<IResponse<string[]>>(this.url`/categories`).pipe(
      map(res => res.data)
    ).subscribe(list => this._categoriesSubject.next(list));
  }

  private _getYears(): void {
    this._http.get<IResponse<number[]>>(this.url`/years`).pipe(
      map(res => res.data)
    ).subscribe(list => this._yearsSubject.next(list));
  }

  private _getNoList(): void {
    this._http.get<IResponse<number[]>>(this.url`/no-list`).pipe(
      map(res => res.data)
    ).subscribe(list => this._noListSubject.next(list));
  }
}
