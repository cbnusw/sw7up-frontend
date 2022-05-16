import { Component, OnInit } from '@angular/core';
import { URLS } from '../../../constants/urls';
import { IPageNavMenu } from '../../../core/components/page-navigator/page-navigator.component';

@Component({
  selector: 'sw-community-main-page',
  templateUrl: './community-main-page.component.html',
  styleUrls: ['./community-main-page.component.scss']
})
export class CommunityMainPageComponent implements OnInit {

  menus: IPageNavMenu[] = [
    { name: '공지사항', link: URLS.COMMUNITY.NOTICE },
    { name: 'E-헬프데스크', link: URLS.COMMUNITY.E_HELP },
    { name: '보도자료', link: URLS.COMMUNITY.PRESS },
    { name: '뉴스레터', link: URLS.COMMUNITY.NEWSLETTER },
    { name: '해외교육', link: URLS.COMMUNITY.OVERSEAS },
    { name: '포토갤러리', link: URLS.COMMUNITY.GALLERY },
    { name: '자료실', link: URLS.COMMUNITY.ARCHIVE },
  ];

  breadcrumbs: Array<string[]>;

  constructor() {
    this.breadcrumbs = this.menus.map(menu => ['커뮤니티', menu.name]);
  }

  ngOnInit(): void {
  }

}
