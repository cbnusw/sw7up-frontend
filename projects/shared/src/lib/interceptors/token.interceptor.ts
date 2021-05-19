import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { ERROR_CODES } from '../constants/error-code';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, StorageService, TOKEN_FLUSH_EVENT } from '../services/storage.service';
import { SharedConfig } from '../shared-config';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(private storage: StorageService,
              private router: Router,
              private config: SharedConfig) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.addToken(request);

    return next.handle(request).pipe(
      catchError(err => {
        if (err.error && err.error.code === ERROR_CODES.ACCESS_TOKEN_EXPIRED) {
          return this.refreshToken(request, next);
        }
        return throwError(err);
      }),
      catchError(err => {
        if (err.status === 401 || err.error.status === 401) {
          const loginPageUrl = this.config.loginPageUrl;
          this.storage.clear();
          this.storage.emit(TOKEN_FLUSH_EVENT);
          loginPageUrl.startsWith('/') ? this.router.navigateByUrl(loginPageUrl) : location.href = loginPageUrl;
        }
        return throwError(err);
      })
    );
  }

  private addToken(request: HttpRequest<any>): HttpRequest<any> {
    const token: string = this.storage.get(ACCESS_TOKEN_KEY);
    return token ? request.clone({ setHeaders: { 'x-access-token': token } }) : request;
  }

  private refreshToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const url = `${this.config.authHost}/token/refresh`;
      const promise = fetch(url, {
        method: 'GET',
        headers: {
          'x-refresh-token': this.storage.get(REFRESH_TOKEN_KEY)
        }
      }).then(res => res.json());

      return from(promise).pipe(
        switchMap(res => {
          const { accessToken, refreshToken } = res.data;
          this.storage.set(REFRESH_TOKEN_KEY, refreshToken);
          this.storage.set(ACCESS_TOKEN_KEY, accessToken);
          this.isRefreshing = false;
          this.refreshTokenSubject.next(accessToken);
          return next.handle(this.addToken(request));
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => !!token),
        take(1),
        switchMap(() => next.handle(this.addToken(request)))
      );
    }
  }
}
