import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'shared';
import { IMenuItem } from '../../../types/menu-item';
import { menus } from './menu';

@Component({
  selector: 'sw-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {

  menus: IMenuItem[];
  hiddenMenus: boolean[];

  // @Output() toggleChange: EventEmitter<undefined> = new EventEmitter<undefined>();

  private subscription: Subscription;

  constructor(private auth: AuthService) {
  }

  collapseOthers(index: number): void {
    this.hiddenMenus = this.hiddenMenus.map((m, i) => i !== index ? true : !m);
  }

  // toggle(): void {
  //   this.toggleChange.emit();
  // }

  ngOnInit(): void {
    this.subscription = this.auth.me$.subscribe(me => {
      this.menus = menus.filter(menu => {
        console.log(menu);
        return menu.roles ? menu.roles.includes(me?.role) : true;
      });
      console.log('MENUS:::', this.menus);
      this.menus = this.menus.map(menu => {
        if (menu.subMenuItems) {
          menu.subMenuItems = menu.subMenuItems.filter(m => m.roles ? m.roles.includes(me?.role) : true);
        }
        return menu;
      });
      this.hiddenMenus = this.menus.map(m => !!m.subMenuItems);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
