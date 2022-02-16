import { Component, OnInit } from '@angular/core';
import { filter, take } from 'rxjs/operators';
import { AuthService } from 'shared';
import { IMenuItem } from '../../../types/menu-item';
import { menus } from './menu';

@Component({
  selector: 'sw-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  menus: IMenuItem[];
  hiddenMenus: boolean[];

  // @Output() toggleChange: EventEmitter<undefined> = new EventEmitter<undefined>();

  constructor(auth: AuthService) {
    auth.me$.pipe(
      filter(me => !!me),
      take(1)
    ).subscribe(me => {
      this.menus = menus.filter(menu => menu.roles ? menu.roles.includes(me.role) : true);
      this.menus = this.menus.map(menu => {
        if (menu.subMenuItems) {
          menu.subMenuItems = menu.subMenuItems.filter(m => m.roles ? m.roles.includes(me.role) : true);
        }
        return menu;
      });
      this.hiddenMenus = this.menus.map(m => !!m.subMenuItems);
    });
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
