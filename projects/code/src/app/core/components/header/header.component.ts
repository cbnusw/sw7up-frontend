import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, StorageService } from 'shared';
import { environment } from '../../../../environments/environment';
import { SideNavService } from '../../services/side-nav.service';

@Component({
  selector: 'sw-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public auth: AuthService,
              private sideNavService: SideNavService,
              private storage: StorageService,
              private router: Router) {
  }

  openSideMenu(): void {
    console.log('open side');
    this.sideNavService.hidden = false;
  }

  moveLoginPage(): boolean {
    this.storage.redirectUrl = `${environment.host}${this.router.url}`;
    location.href = environment.loginPageUrl;
    return false;
  }
}
