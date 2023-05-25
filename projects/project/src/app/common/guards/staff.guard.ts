import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class StaffGuard implements CanActivate, CanActivateChild {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    this.auth.me$.subscribe();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._activate();
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._activate();
  }

  private _activate(): Observable<boolean> {
    return this.auth.hasRole$('staff').pipe(
      tap(isStaff => {
        if (!isStaff) {
          alert('권한이 없는 페이지입니다');
          this.router.navigateByUrl('/dashboard');
        }
      })
    );
  }
}
