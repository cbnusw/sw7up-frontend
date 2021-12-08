import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IMenuItem } from '../../../types/menu-item';
import { menus } from './menu';

@Component({
  selector: 'sw-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  menus: IMenuItem[] = menus;
  hiddenMenus: boolean[];

  // @Output() toggleChange: EventEmitter<undefined> = new EventEmitter<undefined>();

  constructor() {
    this.hiddenMenus = this.menus.map(m => !!m.subMenuItems);
  }

  collapseOthers(index: number): void {
    this.hiddenMenus = this.hiddenMenus.map((m, i) => i !== index ? true : !m);
  }

  // toggle(): void {
  //   this.toggleChange.emit();
  // }

  ngOnInit(): void {
  }

}
