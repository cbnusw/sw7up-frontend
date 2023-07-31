import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { IResponse, IUserInfo, MAJORS, RequestBase } from 'shared';
import { environment } from '../../../../environments/environment';
import { convertQueryToParams } from '../../../tools';
import { Params, QueryConvertor, TPerformedSemester } from '../../../types';

export type RankingType = 'projects' | 'files' | 'codes';

export interface RankingQueryDto {
  startCreatedAt: Date | string | null;
  endCreatedAt: Date | string | null;
  startPerformedAt: TPerformedSemester | null;
  endPerformedAt: TPerformedSemester | null;
  department: string[];
  limit: number | null;
  type: RankingType;
}

export interface RankingDto {
  student: IUserInfo;
  count: number;
}

const DEFAULT_LIMIT = 5;

export const DEFAULT_RANKING_QEURY: RankingQueryDto = {
  startCreatedAt: null,
  endCreatedAt: null,
  startPerformedAt: null,
  endPerformedAt: null,
  department: null,
  limit: DEFAULT_LIMIT,
  type: 'projects'
};

@Injectable()
export class RankingService extends RequestBase implements QueryConvertor<RankingQueryDto> {
  params: Params = {};
  rankings$: Observable<RankingDto[]>;
  pending$: Observable<boolean>;

  private _rankingsSubject: BehaviorSubject<RankingDto[]> = new BehaviorSubject<RankingDto[]>([]);
  private _pendingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private readonly _http: HttpClient) {
    super(environment.codeHost + '/stats/rankings');
    this.rankings$ = this._rankingsSubject.asObservable();
  }

  search(query: Partial<RankingQueryDto>): void {
    this.params = convertQueryToParams(query);
    this._search(this.params);
  }

  convertParamsToQuery(): RankingQueryDto {
    const {
      startCreatedAt = null,
      endCreatedAt = null,
      startPerformedAt = null,
      endPerformedAt = null,
      department = null,
      limit = null,
      type = 'projects',
    } = this.params;

    return {
      startCreatedAt,
      endCreatedAt,
      startPerformedAt,
      endPerformedAt,
      department: department ? (department as string).split(',') : [...MAJORS, '기타'],
      limit: +(limit || DEFAULT_LIMIT),
      type,
    } as RankingQueryDto;
  }

  private _search(params: Params): void {
    this._pendingSubject.next(true);
    this._http.get<IResponse<RankingDto[]>>(this.url`/`, { params }).pipe(
      map(res => res.data),
      finalize(() => this._pendingSubject.next(false)),
    ).subscribe(rankings => this._rankingsSubject.next(rankings));
  }
}
