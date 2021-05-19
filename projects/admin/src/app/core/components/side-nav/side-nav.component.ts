import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { LayoutService } from 'ui';
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
    { name: '일반회원관리', link: '/member' },
    { name: '학생관리', link: '/student' },
    { name: '교직원관리', link: '/staff' },
    { name: '운영자관리', link: '/operator' },
    { name: '공지사항관리', link: '/notice' },
    { name: 'E-Help Desk 관리', link: '/e-help' },
    { name: '보도자료관리', link: '/press-release' },
    { name: '갤러리관리', link: '/gallery' },
    { name: '자료실관리', link: '/resource' },
    { name: '뉴스레터관리', link: '/newsletter' },
    { name: '신고센터관리', link: '/corruption-report' },
  ];

  @ViewChild(MatDrawer) drawer: MatDrawer;

  constructor(public layout: LayoutService,
              private sideNavService: SideNavService) {
  }

  get position$(): Observable<'start' | 'end'> {
    return this.layout.type$.pipe(map(type => type === 'desktop' ? 'start' : 'end'));
  }

  get mode$(): Observable<'side' | 'over'> {
    return this.layout.type$.pipe(map(type => type === 'desktop' ? 'side' : 'over'));
  }

  close(): void {
    this.sideNavService.hidden = true;
  }

  closeWhenMobile(): void {
    if (this.layout.type === 'mobile') {
      this.close();
    }
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
