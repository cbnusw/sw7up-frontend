import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { SideNavService } from '../../services/side-nav.service';

interface Menu {
  name: string;
  link: string;
}

@Component({
  selector: 'sw-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements AfterViewInit, OnDestroy {

  private subscription: Subscription;

  menuGroup: Array<Menu> = [
    { name: '프로젝트관리', link: '/project' },
  ];

  @ViewChild(MatDrawer) drawer: MatDrawer;

  constructor(private sideNavService: SideNavService) {
  }

  close(): void {
    this.sideNavService.hidden = true;
  }

  ngAfterViewInit(): void {
    this.subscription = this.sideNavService.hidden$.subscribe(
      hidden => hidden ? this.drawer.close() : this.drawer.open()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
