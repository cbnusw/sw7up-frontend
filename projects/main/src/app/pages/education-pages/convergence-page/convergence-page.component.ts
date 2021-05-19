import { Component, OnInit } from '@angular/core';

const TAB_MENUS = ['SW융합전공', 'SW융합부전공', '학생설계 SW융합전공'];
declare type TTabMenu = typeof TAB_MENUS[number];

@Component({
  selector: 'sw-convergence-page',
  templateUrl: './convergence-page.component.html',
  styleUrls: ['./convergence-page.component.scss']
})
export class ConvergencePageComponent implements OnInit {

  selectedTab: TTabMenu;
  tabs: TTabMenu[] = TAB_MENUS;

  constructor() {
    this.selectedTab = this.tabs[0];
  }

  ngOnInit(): void {
  }

  changeType(tab: TTabMenu): boolean {
    this.selectedTab = tab;
    return  false;
  }
}
