import { Component, OnInit } from '@angular/core';
import { URLS } from '../../../constants/urls';
import { IPageNavMenu } from '../../../core/components/page-navigator/page-navigator.component';

@Component({
  selector: 'sw-policy-main-page',
  templateUrl: './policy-main-page.component.html',
  styleUrls: ['./policy-main-page.component.scss']
})
export class PolicyMainPageComponent implements OnInit {

  menus: IPageNavMenu[] = [
    { name: '개인정보처리방침', link: URLS.POLICY.PRIVACY },
    { name: '사이트맵', link: URLS.POLICY.SITEMAP },
    { name: '신고센터', link: URLS.POLICY.CLEAN },
  ];

  breadcrumbs: Array<string[]>;

  constructor() {
    this.breadcrumbs = this.menus.map(menu => ['사이트 정보', menu.name]);
  }

  ngOnInit(): void {
  }

}
