import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, StorageService } from 'shared';
import { LayoutService } from 'ui';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'sw-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public auth: AuthService,
              public layout: LayoutService,
              private storage: StorageService,
              private router: Router) {
  }

  moveLoginPage(): boolean {
    this.storage.redirectUrl = `${environment.host}${this.router.url}`;
    location.href = environment.loginPageUrl;
    return false;
  }
}
