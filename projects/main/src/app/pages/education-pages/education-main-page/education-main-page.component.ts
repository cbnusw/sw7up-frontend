import { Component, OnInit } from '@angular/core';
import { URLS } from '../../../constants/urls';
import { IPageNavMenu } from '../../../core/components/page-navigator/page-navigator.component';

@Component({
  selector: 'sw-education-main-page',
  templateUrl: './education-main-page.component.html',
  styleUrls: ['./education-main-page.component.scss']
})
export class EducationMainPageComponent implements OnInit {

  menus: IPageNavMenu[] = [
    { name: 'SW기초교육', link: URLS.EDUCATION.BASIC },
    { name: 'SW전공교육', link: URLS.EDUCATION.MAJOR },
    { name: 'STEP-Up', link: URLS.EDUCATION.STEP_UP },
    { name: 'SW융합교육', link: URLS.EDUCATION.CONVERGENCE },
    { name: 'SW온라인교육', link: URLS.EDUCATION.ONLINE },
    { name: '오픈소스SW', link: URLS.EDUCATION.OSS },
    { name: 'EASY 코스', link: URLS.EDUCATION.EASY },
    { name: '마일리지 장학금', link: URLS.EDUCATION.MILEAGE },
  ];

  breadcrumbs: Array<string[]>;

  constructor() {
    this.breadcrumbs = this.menus.map(menu => ['SW교육', menu.name]);
  }

  ngOnInit(): void {
  }

}
