import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'shared';
import { ITabOption } from '../../../common/controls/components';


@Component({
  selector: 'sw-my-main-page',
  templateUrl: './my-main-page.component.html',
  styleUrls: ['./my-main-page.component.scss']
})
export class MyMainPageComponent implements OnInit {

  tabOptions: ITabOption[] = [
    { viewValue: '통계', value: '/my-page/statistics' },
    { viewValue: '프로젝트', value: '/my-page/projects' },
    { viewValue: '깃헙', value: '/my-page/github' },
    { viewValue: '보고서', value: '/my-page/report' }
  ];

  constructor(
    public auth: AuthService,
    private _router: Router,
  ) {
  }

  get selectedOption(): ITabOption {
    return this.tabOptions.find(option => option.value === this._router.url);
  }

  changeOption(option: ITabOption): void {
    this._router.navigateByUrl(option.value);
  }

  ngOnInit(): void {
  }
}
