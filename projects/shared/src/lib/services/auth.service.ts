import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, retry, tap, timeout } from 'rxjs/operators';
import { RequestBase } from '../classes/request-base';
import { IAuthenticationTokens } from '../models/authentication-tokens';
import { IResponse } from '../models/response';
import { IUser, TUserPermission, TUserRole } from '../models/user';
import { IUserInfo } from '../models/user-info';
import { SharedConfig } from '../shared-config';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, StorageService, TOKEN_FLUSH_EVENT, TOKEN_SHARE_EVENT } from './storage.service';

function hasValue(list: Array<any>, value: any): boolean {
  return list.indexOf(value) !== -1;
}

function hasSomeValues(list: Array<any>, values: Array<any> | any): boolean {
  if (Array.isArray(values)) {
    return values.some(item => list.indexOf(item) !== -1);
  }
  return list.indexOf(values) !== -1;
}

function hasEveryValues(list: Array<any>, values: Array<any>): boolean {
  return values.every(item => list.indexOf(item) !== -1);
}

export interface IFindRegNo {
  name: string;
  email?: string;
  phone?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService extends RequestBase {

  private meSubject: BehaviorSubject<IUser> = new BehaviorSubject(null);
  private readonly config: SharedConfig;

  me$: Observable<IUser> = this.meSubject.asObservable();

  constructor(private http: HttpClient,
              private router: Router,
              private storage: StorageService,
              config: SharedConfig) {
    super(config.authHost);
    this.config = config;
    if (this.loggedIn) {
      this.init();
    }
  }

  get tokens(): IAuthenticationTokens {
    const accessToken: string = this.storage.get(ACCESS_TOKEN_KEY);
    const refreshToken: string = this.storage.get(REFRESH_TOKEN_KEY);
    return { accessToken, refreshToken };
  }

  get loggedIn(): boolean {
    return !!this.storage.get(ACCESS_TOKEN_KEY);
  }

  get me(): IUser {
    return this.meSubject.value;
  }

  get isAdmin(): boolean {
    return this.hasRole('admin');
  }

  get isOperator(): boolean {
    return this.hasRoles('admin', 'operator');
  }

  get isStaff(): boolean {
    return this.hasRole('staff');
  }

  get isStudent(): boolean {
    return this.hasRole('student');
  }

  get isMember(): boolean {
    return this.hasRole('member');
  }

  get isAdmin$(): Observable<boolean> {
    return this.hasRole$('admin');
  }

  get isOperator$(): Observable<boolean> {
    return this.hasRoles$('admin', 'operator');
  }

  get isStaff$(): Observable<boolean> {
    return this.hasRole$('staff');
  }

  get isStudent$(): Observable<boolean> {
    return this.hasRole$('student');
  }

  get isMember$(): Observable<boolean> {
    return this.hasRole$('member');
  }

  join(user: IUser): Observable<boolean> {
    return this.http.post<IResponse<undefined>>(this.url`/join`, user).pipe(
      timeout(5000),
      retry(5),
      map(res => res.success)
    );
  }

  login(no: string, password: string): Observable<boolean> {
    return this.http.post<IResponse<IAuthenticationTokens>>(this.url`/login`, { no, password })
      .pipe(
        timeout(5000),
        retry(5),
        tap(res => {
          this.initTokens(res.data);
          this.init();
        }),
        map(res => res.success)
      );
  }

  loginOperator(no: string, password: string): Observable<boolean> {
    return this.http.post<IResponse<IAuthenticationTokens>>(this.url`/operator/login`, { no, password })
      .pipe(
        timeout(5000),
        retry(5),
        tap(res => {
          this.initTokens(res.data);
          this.init();
        }),
        map(res => res.success)
      );
  }

  async logout(): Promise<void> {
    const token: string = this.storage.get(REFRESH_TOKEN_KEY);
    const { loginPageUrl } = this.config;
    try {
      await this.http.get(
        this.url`/logout`,
        { headers: { 'x-refresh-token': token } }
      ).pipe(
        timeout(5000),
        retry(5)
      ).toPromise();
    } catch (e) {
      console.error(e);
    }
    this.clear();
    loginPageUrl.startsWith('/') ? await this.router.navigateByUrl(loginPageUrl) : location.href = loginPageUrl;
  }

  getMe(): void {
    this.http.get<IResponse<IUser>>(this.url`/me`).pipe(
      timeout(5000),
      retry(5),
    ).subscribe(
      res => this.meSubject.next(res.data),
      err => {
        this.clear();
        console.error(err);
      }
    );
  }

  findRegNo({ name, email, phone }: IFindRegNo): Observable<IResponse<{ no: string }>> {
    return this.http.post(this.url`/no/find`, { name, email, phone }).pipe(
      timeout(5000),
      retry(5),
    );
  }

  sendOtp(no: string, email: string): Observable<IResponse<undefined>> {
    return this.http.post(this.url`/otp/send`, { no, email }).pipe(
      timeout(5000),
      retry(5),
    );
  }

  checkOtp(no: string, code: string): Observable<IResponse<undefined>> {
    return this.http.post(this.url`/otp/check`, { no, code }).pipe(
      timeout(5000),
      retry(5),
    );
  }

  initPassword(no: string, code: string, password: string): Observable<IResponse<undefined>> {
    return this.http.post(this.url`/password/init`, { no, code, password }).pipe(
      timeout(5000),
      retry(5),
    );
  }

  updateMe(body: IUserInfo): Observable<IResponse<undefined>> {
    return this.http.put(this.url`/me`, body).pipe(
      timeout(5000),
      retry(5),
      tap(() => this.getMe())
    );
  }

  changePassword(oldPassword: string, newPassword: string): Observable<IResponse<undefined>> {
    return this.http.patch(this.url`/password`, { oldPassword, newPassword }).pipe(
      timeout(5000),
      retry(5),
    );
  }

  hasRole(role: TUserRole): boolean {
    const { role: r } = this.me || {};
    return r === role;
  }

  hasRoles(...values: Array<TUserRole>): boolean {
    const { role } = this.me || {};
    return hasSomeValues(values, role);
  }

  hasRole$(role: TUserRole): Observable<boolean> {
    return this.me$.pipe(
      map(me => {
        const { role: r } = me || {};
        return r === role;
      })
    );
  }

  hasRoles$(...values: Array<TUserRole>): Observable<boolean> {
    return this.me$.pipe(
      map(me => {
        const { role } = me || {};
        return hasSomeValues(values, role);
      })
    );
  }

  hasPermission(permission: TUserPermission): boolean {
    const { role, permissions = [] } = this.me || {};
    if (hasSomeValues(['admin', 'operator'], role)) {
      return true;
    }
    return hasValue(permissions, permission);
  }

  hasSomePermissions(...values: Array<TUserPermission>): boolean {
    const { role, permissions = [] } = this.me || {};
    if (hasSomeValues(['admin', 'operator'], role)) {
      return true;
    }
    return hasSomeValues(permissions, values);
  }

  hasEveryPermissions(...values: Array<TUserPermission>): boolean {
    const { role, permissions = [] } = this.me || {};
    if (hasSomeValues(['admin', 'operator'], role)) {
      return true;
    }
    return hasEveryValues(permissions, values);
  }

  hasPermission$(permission: TUserPermission): Observable<boolean> {
    return this.me$.pipe(
      map(me => {
        const { role, permissions = [] } = me || {};
        if (hasSomeValues(['admin', 'operator'], role)) {
          return true;
        }
        return hasValue(permissions, permission);
      })
    );
  }

  hasSomePermissions$(...values: Array<TUserPermission>): Observable<boolean> {
    return this.me$.pipe(
      map(me => {
        const { role, permissions = [] } = me || {};
        if (hasSomeValues(['admin', 'operator'], role)) {
          return true;
        }
        return hasSomeValues(permissions, values);
      })
    );
  }

  hasEveryPermissions$(...values: Array<TUserPermission>): Observable<boolean> {
    return this.me$.pipe(
      map(me => {
        const { role, permissions = [] } = me || {};
        if (hasSomeValues(['admin', 'operator'], role)) {
          return true;
        }
        return hasEveryValues(permissions, values);
      })
    );
  }

  protected init(): void {
    // todo: 여기에 로그인 후 초기화해야 할 작업 구현
    this.getMe();
  }

  private initTokens({ accessToken, refreshToken }: IAuthenticationTokens): void {
    this.storage.set(ACCESS_TOKEN_KEY, accessToken);
    this.storage.set(REFRESH_TOKEN_KEY, refreshToken);
    this.storage.emit(TOKEN_SHARE_EVENT, { accessToken, refreshToken });
  }

  private clear(): void {
    this.storage.clear();
    this.storage.emit(TOKEN_FLUSH_EVENT);
    this.meSubject.next(null);
  }
}
