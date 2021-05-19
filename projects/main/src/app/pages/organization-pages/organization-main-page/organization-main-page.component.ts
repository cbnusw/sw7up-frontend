import { Component, OnInit } from '@angular/core';
import { URLS } from '../../../constants/urls';
import { IPageNavMenu } from '../../../core/components/page-navigator/page-navigator.component';

@Component({
  selector: 'sw-organization-main-page',
  templateUrl: './organization-main-page.component.html',
  styleUrls: ['./organization-main-page.component.scss']
})
export class OrganizationMainPageComponent implements OnInit {

  menus: IPageNavMenu[] = [
    { name: '인사말', link: URLS.ORGANIZATION.GREETINGS },
    { name: '사업목표', link: URLS.ORGANIZATION.OBJECTIVE },
    { name: '추진방향', link: URLS.ORGANIZATION.VISION },
    { name: '조직도', link: URLS.ORGANIZATION.MEMBER },
    { name: '교육시설', link: URLS.ORGANIZATION.FACILITY },
    { name: '오시는 길', link: URLS.ORGANIZATION.LOCATION },
  ];

  breadcrumbs: Array<string[]>;

  constructor() {
    this.breadcrumbs = this.menus.map(menu => ['사업소개', menu.name]);
  }

  ngOnInit(): void {
  }

}
