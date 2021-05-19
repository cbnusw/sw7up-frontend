import { Component, OnInit } from '@angular/core';

const TAB_MENUS = ['오픈소스SW센터', '오픈소스SW 운영보조원', '오픈소스SW 동아리', '오픈소스SW 프로그램', '오픈소스SW 튜토리얼'];
declare type TTabMenu = typeof TAB_MENUS[number];

@Component({
  selector: 'sw-oss-page',
  templateUrl: './oss-page.component.html',
  styleUrls: ['./oss-page.component.scss']
})
export class OssPageComponent implements OnInit {

  selectedTab: TTabMenu;
  tabs: TTabMenu[] = TAB_MENUS;

  constructor() {
    this.selectedTab = this.tabs[0];
  }

  ngOnInit(): void {
  }

  changeType(tab: TTabMenu): boolean {
    this.selectedTab = tab;
    return false;
  }
}
