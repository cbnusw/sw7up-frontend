import { Component, OnInit } from '@angular/core';
import { URLS } from '../../../constants/urls';
import { IPageNavMenu } from '../../../core/components/page-navigator/page-navigator.component';

@Component({
  selector: 'sw-my-main-page',
  templateUrl: './my-main-page.component.html',
  styleUrls: ['./my-main-page.component.scss']
})
export class MyMainPageComponent implements OnInit {

  menus: IPageNavMenu[] = [
    { name: '내 정보 수정', link: URLS.MY_PAGE.INFO },
    { name: '비밀번호 변경', link: URLS.MY_PAGE.PASSWORD },
  ];

  tabs = [
    { viewValue: '정보수정', link: URLS.MY_PAGE.INFO },
    { viewValue: '비밀번호', link: URLS.MY_PAGE.PASSWORD }
  ];

  breadcrumbs: Array<string[]>;

  constructor() {
    this.breadcrumbs = this.menus.map(menu => ['마이페이지', menu.name]);
  }

  ngOnInit(): void {
  }

}
