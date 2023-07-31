import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ITabOption } from '../../../common/controls/components';
import { ProfessorMenuService } from '../services/professor-menu-service';

@Component({
  selector: 'sw-professor-main-page',
  templateUrl: './professor-main-page.component.html',
  styleUrls: ['./professor-main-page.component.scss'],
  providers: [ProfessorMenuService]
})
export class ProfessorMainPageComponent implements OnInit, OnDestroy {
  tabOptions: ITabOption[] = [
    {
      viewValue: '지도학생 관리',
      value: '/professor/students',
    },
    {
      viewValue: '전체 통계',
      value: '/professor/stats'
    }
  ];

  option = this.tabOptions[0];

  private _subscription = new Subscription();

  constructor(
    public readonly menuService: ProfessorMenuService,
    private readonly _router: Router
  ) {
  }

  movePage(event: ITabOption): void {
    this._router.navigateByUrl(event.value);
  }

  ngOnInit(): void {
    this._subscription.add(
      this._router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: any) => {
          this.option = this.tabOptions.find(({ value }) => value === event.url) || this.tabOptions[0];
        })
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
