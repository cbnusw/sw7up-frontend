import { Component, OnInit } from '@angular/core';
import { URLS } from '../../../constants/urls';
import { IPageNavMenu } from '../../../core/components/page-navigator/page-navigator.component';

@Component({
  selector: 'sw-guadian-main-page',
  templateUrl: './guardian-main-page.component.html',
  styleUrls: ['./guardian-main-page.component.scss']
})
export class GuardianMainPageComponent implements OnInit {

  menus: IPageNavMenu[] = [
    { name: '1인 1가디언', link: URLS.GUARDIAN.ONE2ONE },
  ];

  breadcrumbs: Array<string[]>;

  constructor() {
    this.breadcrumbs = this.menus.map(menu => ['가디언프로그램', menu.name]);
  }

  ngOnInit(): void {
  }

}
