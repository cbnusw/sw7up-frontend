import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService, IResponse, RequestBase } from 'shared';
import { environment } from '../../../../../environments/environment';
import { StudentDto } from '../../../../types';

@Injectable({
  providedIn: 'root'
})
export class MyStudentInfoService extends RequestBase {
  readonly studentInfo$: Observable<StudentDto | null>;

  private readonly _studentInfoSubject: BehaviorSubject<StudentDto | null> = new BehaviorSubject<StudentDto | null>(null);

  constructor(
    private readonly _auth: AuthService,
    private readonly _http: HttpClient
  ) {
    super(environment.codeHost + '/students');
    this.studentInfo$ = this._studentInfoSubject.asObservable();

    this._auth.me$.pipe(
      map(me => me?.info || null)
    ).subscribe(info => info ? this.load() : this._studentInfoSubject.next(null));
  }

  get studentInfo(): StudentDto | null {
    return this._studentInfoSubject.value;
  }

  load(): void {
    this._http.get<IResponse<StudentDto | null>>(this.url`/me/info`).pipe(
      map(res => res.data)
    ).subscribe(info => this._studentInfoSubject.next(info));
  }
}
