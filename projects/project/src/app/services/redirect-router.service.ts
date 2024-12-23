import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class RedirectRouterService {

  constructor(
    private _storage: StorageService,
    private _router: Router,
    private readonly _route: ActivatedRoute,
  ) {
  }

  async navigateProjectPage(id: string): Promise<void> {
    this._storage.set('project-redirect-url', this._router.url);
    await this._router.navigateByUrl(`/projects/${id}`);
  }

  async exitProjectPage(): Promise<void> {
    // const redirectUrl: string = this._storage.redirectUrl;
    const redirectUrl = this._route.snapshot.queryParams.redirectUrl || '/';
    await this._router.navigateByUrl(redirectUrl);
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
    this._storage.redirectUrl = this._router.url;
  }
}
