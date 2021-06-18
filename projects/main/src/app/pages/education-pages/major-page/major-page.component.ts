import { Component, OnInit } from '@angular/core';

const TAB_MENUS = [
  '지능SW융합전공',
  '교과운영지원',
  '교육품질향상',
  '실전영어교육',
  '해외교육',
  '대학-대학원협력',
  'TOPCIT응시지원'
];
declare type TTabMenu = typeof TAB_MENUS[number];

@Component({
  selector: 'sw-major-page',
  templateUrl: './major-page.component.html',
  styleUrls: ['./major-page.component.scss']
})
export class MajorPageComponent implements OnInit {

  selectedTab: TTabMenu;
  tabs: TTabMenu[] = TAB_MENUS;

  constructor() {
    this.selectedTab = this.tabs[0];
  }

  ngOnInit(): void {
  }

  changeType(tab: string): boolean {
    this.selectedTab = tab;
    return false;
  }
}
