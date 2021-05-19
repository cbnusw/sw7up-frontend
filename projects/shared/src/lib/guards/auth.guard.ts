import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { SharedConfig } from '../shared-config';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private auth: AuthService,
              private storage: StorageService,
              private config: SharedConfig,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.activate(state);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.activate(state);
  }

  private activate(state: RouterStateSnapshot): boolean {
    if (this.auth.loggedIn) {
      return true;
    }
    this.storage.redirectUrl = `${this.config.baseUrl}${state.url}`;
    const url = this.config.loginPageUrl;
    (url || '/').startsWith('http') ? location.href = url : this.router.navigateByUrl(url);
    return false;
  }

}
