import { Component, OnInit } from '@angular/core';
import { URLS } from '../../../constants/urls';
import { IPageNavMenu } from '../../../core/components/page-navigator/page-navigator.component';

@Component({
  selector: 'sw-value-main-page',
  templateUrl: './value-main-page.component.html',
  styleUrls: ['./value-main-page.component.scss']
})
export class ValueMainPageComponent implements OnInit {

  menus: IPageNavMenu[] = [
    { name: 'SW가치확산', link: URLS.VALUE.SPREAD },
    { name: 'SW봉사단', link: URLS.VALUE.VOLUNTEER },
  ];

  breadcrumbs: Array<string[]>;

  constructor() {
    this.breadcrumbs = this.menus.map(menu => ['SW가치확산', menu.name]);
  }

  ngOnInit(): void {
  }

}
