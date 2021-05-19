import { Component, OnInit } from '@angular/core';
import { URLS } from '../../../constants/urls';
import { IPageNavMenu } from '../../../core/components/page-navigator/page-navigator.component';

@Component({
  selector: 'sw-cooperate-main-page',
  templateUrl: './cooperate-main-page.component.html',
  styleUrls: ['./cooperate-main-page.component.scss']
})
export class CooperateMainPageComponent implements OnInit {

  menus: IPageNavMenu[] = [
    { name: '산학프로젝트', link: URLS.COOPERATE.PROJECT },
    { name: '인턴십', link: URLS.COOPERATE.INTERNSHIP },
    { name: '1인 1가디언', link: URLS.COOPERATE.GUARDIAN },
    { name: '創-Up 프로그램', link: URLS.COOPERATE.STARTUP },
  ];

  breadcrumbs: Array<string[]>;

  constructor() {
    this.breadcrumbs = this.menus.map(menu => ['산학협력', menu.name]);
  }

  ngOnInit(): void {
  }

}
