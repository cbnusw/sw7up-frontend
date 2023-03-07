import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class RedirectRouterService {

  constructor(
    private _storage: StorageService,
    private _router: Router
  ) {
  }

  async navigateProjectPage(id: string): Promise<void> {
    this._storage.set('project-redirect-url', this._router.url);
    await this._router.navigateByUrl(`/projects/${id}`);
  }

  async exitProjectPage(): Promise<void> {
    const redirectUrl: string = this._storage.get('project-redirect-url');
    console.log('exit:::', redirectUrl);
    this._storage.remove('project-redirect-url');
    await this._router.navigateByUrl(redirectUrl || '/');
  }

  async navigateByUrl(url: string): Promise<boolean> {
    this._setRedirectUrl();
    return this._router.navigateByUrl(url);
  }

  async navigate(command): Promise<boolean> {
    this._setRedirectUrl();
    return this._router.navigate(command);
  }

  async redirect(): Promise<boolean> {
    const redirectUrl = this._storage.redirectUrl || '/';
    return this._router.navigateByUrl(redirectUrl);
  }

  private _setRedirectUrl(): void {
    console.log(this._router.url);
    this._storage.redirectUrl = this._router.url;
  }
}
