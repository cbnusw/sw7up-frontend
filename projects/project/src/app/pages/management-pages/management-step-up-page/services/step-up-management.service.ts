import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { IListResponse, IResponse, RequestBase } from 'shared';
import { environment } from '../../../../../environments/environment';
import { SearchTopcitsQueryDto } from '../../management-topcit-page/services/topcit-management.service';

type Params = {
  [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
};

export interface SearchStepUpQueryDto {
  level?: number | null;
  department?: string | null;
  studentNo?: string | null;
  studentName?: string | null;
}

export interface StepUpResponseDto {
  _id: string;
  department: string;
  no: string;
  name: string;
  level: number;
  registeredAt: Date;
}

export interface RegisterStepUpDto {
  department: string;
  no: string;
  name: string;
  level: number;
  registeredAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class StepUpManagementService extends RequestBase {
  total = 0;
  params: Params = {};

  readonly pending$: Observable<boolean>;
  readonly documents$: Observable<StepUpResponseDto[]>;
  readonly levels$: Observable<number[]>;
  readonly departments$: Observable<string[]>;

  private readonly _pendingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private readonly _documentsSubject: BehaviorSubject<StepUpResponseDto[]> = new BehaviorSubject<StepUpResponseDto[]>([]);
  private readonly _levelsSubject: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  private readonly _departmentsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(private readonly _http: HttpClient) {
    super(environment.codeHost + '/managements/step-up');
    this.pending$ = this._pendingSubject.asObservable();
    this.documents$ = this._documentsSubject.asObservable();
    this.levels$ = this._levelsSubject.asObservable();
    this.departments$ = this._departmentsSubject.asObservable();
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
    this._getDepartments();
    this._getLevels();
  }

  private _getDepartments(): void {
    this._http.get<IResponse<string[]>>(this.url`/departments`).pipe(
      map(res => res.data),
    ).subscribe(list => this._departmentsSubject.next(list));
  }

  private _getLevels(): void {
    this._http.get<IResponse<number[]>>(this.url`/levels`).pipe(
      map(res => res.data),
    ).subscribe(list => this._levelsSubject.next(list));
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
