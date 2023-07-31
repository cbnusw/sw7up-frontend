import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IResponse, RequestBase } from 'shared';
import { environment } from '../../environments/environment';
import { convertQueryToParams } from '../tools';
import { TPerformedSemester } from '../types';

export interface ProjectsQuery {
  startPerformedAt?: TPerformedSemester | null;
  endPerformedAt?: TPerformedSemester | null;
  startYear?: number | null;
  endYear?: number | null;
  department?: string[];
}

export type SemesterBase = TPerformedSemester;
export type SemesterBaseData = {
  projects: { [key in SemesterBase]: number; };
  files: { [key in SemesterBase]: number; };
  codes: { [key in SemesterBase]: number; };
  comments: { [key in SemesterBase]: number; };
  students: { [key in SemesterBase]: number; };
};

export type StringBaseData = {
  projects: { [key in string]: number; };
  files: { [key in string]: number; };
  codes: { [key in string]: number; };
  comments: { [key in string]: number; };
  students: { [key in string]: number; };
};

export type DepartmentData = StringBaseData;

export type ProjectTotal = {
  projects: number;
  files: number;
  codes: number;
  comments: number;
  students: number;
};

export type ProjectsDto = {
  total: ProjectTotal;
  years: SemesterBaseData;
  grades: SemesterBaseData;
  departments: DepartmentData;
};

export type StudentProjectsDto = Omit<ProjectsDto, 'departments'>;

export type LanguagesDto = StringBaseData;

export interface TopcitStatDto {
  _id: string;
  category: string;
  year: number;
  no: number;
  totalScore: number;
  subjects: { name: string; score: number }[];
}

export interface StudentTopcitDto {
  _id: string;
  level: number;
  no: number;
  year: number;
  totalScore: number;
  student: {
    grade: string;
    department: string;
    no: string;
    name: string;
  };
  subjects: { name: string; score: number }[];
}

export interface StudentStepUpDto {
  _id: string;
  performedAt: TPerformedSemester;
  level: number;
  pass: boolean;
  department: string;
  no: string;
  name: string;
  subjects: { name: string; score: number }[];
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class StatService extends RequestBase {
  constructor(private readonly _http: HttpClient) {
    super(environment.codeHost + '/stats');
  }

  getProjects(query?: ProjectsQuery): Observable<ProjectsDto> {
    const params = convertQueryToParams(query);
    return this._http.get<IResponse<ProjectsDto>>(this.url`/projects`, { params }).pipe(
      map(res => res.data)
    );
  }

  getLanguages(query?: ProjectsQuery): Observable<LanguagesDto> {
    const params = convertQueryToParams(query);
    return this._http.get<IResponse<LanguagesDto>>(this.url`/languages`, { params }).pipe(
      map(res => res.data)
    );
  }

  getTopcitStats(no: number): Observable<TopcitStatDto[]> {
    return this._http.get<IResponse<TopcitStatDto[]>>(this.url`/topcit-stats/${no}`).pipe(
      map(res => res.data)
    );
  }

  getStudentProjects(no: string, query?: ProjectsQuery): Observable<StudentProjectsDto | null> {
    const params =  convertQueryToParams(query);
    return this._http.get<IResponse<StudentProjectsDto>>(this.url`/${no}/projects`, { params }).pipe(
      map(res => res.data),
      catchError(() => of(null))
    );
  }

  getStudentProjectYears(no: string): Observable<number[]> {
    return this._http.get<IResponse<number[]>>(this.url`/${no}/projects/years`).pipe(
      map(res => res.data),
      catchError(() => of([]))
    );
  }

  getStudentLanguages(no: string, query?: ProjectsQuery): Observable<LanguagesDto | null> {
    const params = convertQueryToParams(query);
    return this._http.get<IResponse<LanguagesDto>>(this.url`/${no}/languages`, { params }).pipe(
      map(res => res.data),
      catchError(() => of(null))
    );
  }

  getStudentTopcits(no: string): Observable<StudentTopcitDto[]> {
    return this._http.get<IResponse<StudentTopcitDto[]>>(this.url`/${no}/topcits`).pipe(
      map(res => res.data)
    );
  }

  getStudentStepUps(no: string): Observable<StudentStepUpDto[]> {
    return this._http.get<IResponse<StudentStepUpDto[]>>(this.url`/${no}/step-ups`).pipe(
      map(res => res.data)
    );
  }
}
