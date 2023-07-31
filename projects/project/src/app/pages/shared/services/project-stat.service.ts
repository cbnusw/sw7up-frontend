import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MAJORS } from 'shared';
import { LanguagesDto, ProjectsDto, ProjectsQuery, StatService } from '../../../services/stat.service';
import { convertQueryToParams } from '../../../tools';
import { Params, QueryConvertor } from '../../../types';

const DEFAULT_PROJECTS_DTO: ProjectsDto = {
  total: {
    projects: 0,
    files: 0,
    codes: 0,
    comments: 0,
    students: 0,
  },
  years: {
    projects: {},
    files: {},
    codes: {},
    comments: {},
    students: {},
  },
  grades: {
    projects: {},
    files: {},
    codes: {},
    comments: {},
    students: {},
  },
  departments: {
    projects: {},
    files: {},
    codes: {},
    comments: {},
    students: {},
  },
};

const DEFAULT_LANGUAGES_DTO: LanguagesDto = {
  projects: {},
  files: {},
  codes: {},
  comments: {},
  students: {},
};

@Injectable()
export class ProjectStatService implements QueryConvertor<ProjectsQuery> {
  params: Params = {};

  readonly pending$: Observable<boolean>;
  readonly projects$: Observable<ProjectsDto>;
  readonly languages$: Observable<LanguagesDto>;

  private readonly _pendingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private readonly _projectsSubject: BehaviorSubject<ProjectsDto> = new BehaviorSubject<ProjectsDto>({ ...DEFAULT_PROJECTS_DTO });
  private readonly _languagesSubject: BehaviorSubject<LanguagesDto> = new BehaviorSubject<LanguagesDto>({ ...DEFAULT_LANGUAGES_DTO });

  constructor(private readonly _statService: StatService) {
    this.pending$ = this._pendingSubject.asObservable();
    this.projects$ = this._projectsSubject.asObservable();
    this.languages$ = this._languagesSubject.asObservable();
  }

  get projects(): ProjectsDto {
    return this._projectsSubject.value;
  }

  get languages(): LanguagesDto {
    return this._languagesSubject.value;
  }

  search(query: Partial<ProjectsQuery>): void {
    this.params = convertQueryToParams(query);
    this._pendingSubject.next(true);
    forkJoin([
      this._statService.getProjects(query),
      this._statService.getLanguages(query)
    ]).pipe(
      finalize(() => this._pendingSubject.next(false))
    ).subscribe(([projects, languages]) => {
      this._projectsSubject.next(projects);
      this._languagesSubject.next(languages);
    });
  }

  convertParamsToQuery(): ProjectsQuery {
    const {
      startPerformedAt = null,
      endPerformedAt = null,
      startYear = null,
      endYear = null,
      department = null,
    } = this.params;

    return {
      startPerformedAt,
      endPerformedAt,
      startYear,
      endYear,
      department: department ? (department as string).split(',') : [...MAJORS, '기타'],
    } as ProjectsQuery;
  }
}
