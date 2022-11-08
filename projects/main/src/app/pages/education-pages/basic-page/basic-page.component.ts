import { Component, OnInit } from '@angular/core';

const TAB_MENUS = [
  'SW기초교육',
  'SW기초교육체계',
];
declare type TTabMenu = typeof TAB_MENUS[number];

@Component({
  selector: 'sw-basic-page',
  templateUrl: './basic-page.component.html',
  styleUrls: ['./basic-page.component.scss']
})
export class BasicPageComponent implements OnInit {

  selectedTab: TTabMenu;
  tabs: TTabMenu[] = TAB_MENUS;

  constructor() {
    this.selectedTab = this.tabs[0];
  }

  changeType(tab: string): boolean {
    this.selectedTab = tab;
    return false;
  }

  ngOnInit(): void {
  }

}
