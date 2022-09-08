import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, StorageService } from 'shared';
import { environment } from '../../../../../environments/environment';
import { RedirectRouterService } from '../../../../services';
import { IPopupMenuItem } from '../../../controls/components';

@Component({
  selector: 'sw-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  popupItems: IPopupMenuItem[] = [
    {
      viewValue: () => '프로젝트 등록',
      styleClass: () => 'lg:hidden',
      filter: () => this.auth.isStudent,
      action: () => this.router.navigateByUrl('/projects/register'),
    },
    {
      viewValue: () => '프로젝트 관리',
      styleClass: () => 'lg:hidden',
      filter: () => this.auth.isOperator,
      action: () => this.router.navigateByUrl('/management'),
    },
    {
      viewValue: () => '마이페이지',
      filter: () => this.auth.isStudent,
      action: () => this.router.navigateByUrl('/my-page'),
    },
    {
      viewValue: () => '로그아웃',
      action: () => this.auth.logout(),
    }
  ];

  isOpenPopup = false;

  constructor(
    public auth: AuthService,
    public redirectRouter: RedirectRouterService,
    public storage: StorageService,
    private router: Router,
  ) {
  }

  get loginUrl(): string {
    this.storage.redirectUrl = `${environment.host}${this.router.url}`;
    return environment.loginPageUrl;
  }

  blur(event: FocusEvent): void {
    event.stopPropagation();
    this.isOpenPopup = false;
  }

  navigate(event: MouseEvent, url: string): void {
    event.stopPropagation();
    this.router.navigateByUrl(url);
    this.isOpenPopup = false;
  }

  logout(event: MouseEvent): void {
    event.stopPropagation();
    this.auth.logout();
    this.isOpenPopup = false;
  }

  ngOnInit(): void {
  }
}
