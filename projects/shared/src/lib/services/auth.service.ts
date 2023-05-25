import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
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

  constructor(private readonly _http: HttpClient,
              private readonly _router: Router,
              private readonly _storage: StorageService,
              config: SharedConfig) {
    super(config.authHost);
    this.config = config;
    if (this.loggedIn) {
      this.init();
    }
  }

  get tokens(): IAuthenticationTokens {
    const accessToken: string = this._storage.get(ACCESS_TOKEN_KEY);
    const refreshToken: string = this._storage.get(REFRESH_TOKEN_KEY);
    return { accessToken, refreshToken };
  }

  get loggedIn(): boolean {
    return !!this._storage.get(ACCESS_TOKEN_KEY);
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
    return this._http.post<IResponse<undefined>>(this.url`/join`, user).pipe(
      map(res => res.success)
    );
  }

  login(no: string, password: string): Observable<boolean> {
    return this._http.post<IResponse<IAuthenticationTokens>>(this.url`/login`, { no, password })
      .pipe(
        tap(res => {
          this.initTokens(res.data);
          this.init();
        }),
        map(res => res.success)
      );
  }

  loginOperator(no: string, password: string): Observable<boolean> {
    return this._http.post<IResponse<IAuthenticationTokens>>(this.url`/operator/login`, { no, password })
      .pipe(
        tap(res => {
          this.initTokens(res.data);
          this.init();
        }),
        map(res => res.success)
      );
  }

  async logout(): Promise<void> {
    const token: string = this._storage.get(REFRESH_TOKEN_KEY);
    const { loginPageUrl } = this.config;
    try {
      await this._http.get(
        this.url`/logout`,
        { headers: { 'x-refresh-token': token } }
      ).toPromise();
    } catch (e) {
      console.error(e);
    }
    this.clear();
    loginPageUrl.startsWith('/') ? await this._router.navigateByUrl(loginPageUrl) : location.href = loginPageUrl;
  }

  getMe(): void {
    this._http.get<IResponse<IUser>>(this.url`/me`).subscribe(
      res => this.meSubject.next(res.data),
      err => {
        this.clear();
        console.error(err);
      }
    );
  }

  findRegNo({ name, email, phone }: IFindRegNo): Observable<IResponse<{ no: string }>> {
    return this._http.post(this.url`/no/find`, { name, email, phone });
  }

  sendOtp(no: string, email: string): Observable<IResponse<undefined>> {
    return this._http.post(this.url`/otp/send`, { no, email });
  }

  checkOtp(no: string, code: string): Observable<IResponse<undefined>> {
    return this._http.post(this.url`/otp/check`, { no, code });
  }

  initPassword(no: string, code: string, password: string): Observable<IResponse<undefined>> {
    return this._http.post(this.url`/password/init`, { no, code, password });
  }

  updateMe(body: IUserInfo): Observable<IResponse<undefined>> {
    return this._http.put(this.url`/me`, body).pipe(
      tap(() => this.getMe())
    );
  }

  changePassword(oldPassword: string, newPassword: string): Observable<IResponse<undefined>> {
    return this._http.patch(this.url`/password`, { oldPassword, newPassword });
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
      filter(me => this.loggedIn ? !!me : true),
      map(me => {
        const { role: r } = me || {};
        return r === role;
      })
    );
  }

  hasRoles$(...values: Array<TUserRole>): Observable<boolean> {
    return this.me$.pipe(
      filter(me => this.loggedIn ? !!me : true),
      map(me => {
        const { role } = me || {};
        return hasSomeValues(values, role);
      })
    );
  }

  hasPermission(permission: TUserPermission): boolean {
    const { permissions = [] } = this.me || {};
    return hasValue(permissions, permission);
  }

  hasSomePermissions(...values: Array<TUserPermission>): boolean {
    const { permissions = [] } = this.me || {};
    return hasSomeValues(permissions, values);
  }

  hasEveryPermissions(...values: Array<TUserPermission>): boolean {
    const { permissions = [] } = this.me || {};
    return hasEveryValues(permissions, values);
  }

  hasPermission$(permission: TUserPermission): Observable<boolean> {
    return this.me$.pipe(
      filter(me => this.loggedIn ? !!me : true),
      map(me => {
        const { permissions = [] } = me || {};
        return hasValue(permissions, permission);
      })
    );
  }

  hasSomePermissions$(...values: Array<TUserPermission>): Observable<boolean> {
    return this.me$.pipe(
      filter(me => this.loggedIn ? !!me : true),
      map(me => {
        const { permissions = [] } = me || {};
        return hasSomeValues(permissions, values);
      })
    );
  }

  hasEveryPermissions$(...values: Array<TUserPermission>): Observable<boolean> {
    return this.me$.pipe(
      filter(me => this.loggedIn ? !!me : true),
      map(me => {
        const { permissions = [] } = me || {};
        return hasEveryValues(permissions, values);
      })
    );
  }

  protected init(): void {
    // todo: 여기에 로그인 후 초기화해야 할 작업 구현
    this.getMe();
  }

  private initTokens({ accessToken, refreshToken }: IAuthenticationTokens): void {
    this._storage.set(ACCESS_TOKEN_KEY, accessToken);
    this._storage.set(REFRESH_TOKEN_KEY, refreshToken);
    this._storage.emit(TOKEN_SHARE_EVENT, { accessToken, refreshToken });
  }

  private clear(): void {
    this._storage.clear();
    this._storage.emit(TOKEN_FLUSH_EVENT);
    this.meSubject.next(null);
  }
}
