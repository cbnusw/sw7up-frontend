import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared';
import { URLS } from '../../../constants/urls';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'sw-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  readonly HOME_URL = URLS.HOME.ROOT;
  readonly LOGIN_URL = URLS.ACCOUNT.LOGIN;
  readonly JOIN_URL = URLS.ACCOUNT.JOIN;
  readonly MY_PAGE_URL = URLS.MY_PAGE.ROOT;

  constructor(public auth: AuthService,
              public navigation: NavigationService) { }

  logout(): void {
    this.auth.logout();
  }

  ngOnInit(): void {
  }
}
