import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthService } from 'shared';
import { LayoutService } from 'ui';
import { SideNavService } from '../../services/side-nav.service';

@Component({
  selector: 'sw-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public auth: AuthService,
              public layout: LayoutService,
              public sideNavService: SideNavService) {
  }

  openSideMenu(): void {
    this.sideNavService.hidden = false;
  }
}
