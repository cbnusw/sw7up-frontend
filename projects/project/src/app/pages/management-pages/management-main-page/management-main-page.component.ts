import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITabOption } from '../../../common/controls/components';

@Component({
  selector: 'sw-management-main-page',
  templateUrl: './management-main-page.component.html',
  styleUrls: ['./management-main-page.component.scss']
})
export class ManagementMainPageComponent implements OnInit {

  tabOptions: ITabOption[] = [
    { viewValue: '프로젝트', value: '/management/projects' },
    { viewValue: '통계', value: '/management/statistics' },
    { viewValue: '랭킹', value: '/management/ranking' },
    { viewValue: '프로그래밍언어', value: '/management/languages' },
  ];

  constructor(
    private _router: Router,
  ) {
  }

  get selectedOption(): ITabOption {
    return this.tabOptions.find(option => option.value === this._router.url);
  }

  ngOnInit(): void {
  }

  changeOption(option: ITabOption): void {
    this._router.navigateByUrl(option.value);
  }
}
