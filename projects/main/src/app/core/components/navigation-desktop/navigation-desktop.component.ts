import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { URLS } from '../../../constants/urls';

interface NavMenu {
  name: string;
  link: string;
}

@Component({
  selector: 'sw-navigation-desktop',
  templateUrl: './navigation-desktop.component.html',
  styleUrls: ['./navigation-desktop.component.scss']
})
export class NavigationDesktopComponent implements OnInit {

  readonly HOME_URL = URLS.HOME.ROOT;
  readonly CODE_URL = environment.codeUrl;

  menus: NavMenu[] = [
    { name: '사업소개', link: URLS.ORGANIZATION.ROOT },
    { name: '가디언', link: URLS.GUARDIAN.ROOT },
    { name: 'SW교육', link: URLS.EDUCATION.ROOT },
    { name: '산학협력', link: URLS.COOPERATE.ROOT },
    { name: 'SW가치확산', link: URLS.VALUE.ROOT },
    { name: '공지사항', link: URLS.COMMUNITY.NOTICE },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
