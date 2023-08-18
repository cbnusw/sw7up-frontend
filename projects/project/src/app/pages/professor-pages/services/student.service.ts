import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, finalize, map, switchMap, tap } from 'rxjs/operators';
import { IResponse, RequestBase } from 'shared';
import { environment } from '../../../../environments/environment';
import { StudentDto } from '../../../types';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends RequestBase {
  pending = false;
  readonly students$: Observable<StudentDto[]>;

  private readonly _loadedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private readonly _studentsSubject: BehaviorSubject<StudentDto[]> = new BehaviorSubject<StudentDto[]>([]);

  constructor(private _http: HttpClient) {
    super(environment.codeHost + '/professors');
    this.students$ = this._loadedSubject.asObservable().pipe(
      filter(loaded => loaded),
      switchMap(() => this._studentsSubject.asObservable())
    );
    this.search();
  }

  get students(): StudentDto[] {
    return this._studentsSubject.value;
  }

  search(): void {
    this._http.get<IResponse<StudentDto[]>>(this.url`/students`).pipe(
      map(res => res.data),
      tap(students => this._studentsSubject.next(students.sort((a, b) => {
        if (a.grade === b.grade) {
          return a.name <= b.name ? -1 : 1;
        }
        return a.grade <= b.grade ? -1 : 1;
      }))),
      finalize(() => this._loadedSubject.next(true))
    ).subscribe();
  }
}
