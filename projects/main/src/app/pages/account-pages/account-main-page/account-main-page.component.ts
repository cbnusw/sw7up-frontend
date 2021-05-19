import { Component, OnInit } from '@angular/core';
import { URLS } from '../../../constants/urls';
import { IPageNavMenu } from '../../../core/components/page-navigator/page-navigator.component';

@Component({
  selector: 'sw-account-main-page',
  templateUrl: './account-main-page.component.html',
  styleUrls: ['./account-main-page.component.scss']
})
export class AccountMainPageComponent implements OnInit {

  menus: IPageNavMenu[] = [
    { name: '로그인', link: URLS.ACCOUNT.LOGIN },
    { name: '회원가입', link: URLS.ACCOUNT.JOIN },
    { name: '계정 찾기', link: URLS.ACCOUNT.FIND },
    { name: '비밀번호 찾기', link: URLS.ACCOUNT.PASSWORD }
  ];

  breadcrumbs: Array<string[]>;

  constructor() {
    this.breadcrumbs = this.menus.map(menu => ['사업단회원', menu.name]);
  }

  ngOnInit(): void {
  }

}
