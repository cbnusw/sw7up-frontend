import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

export interface IPageNavMenu {
  name: string;
  link: string;
}

@Component({
  selector: 'sw-page-header',
  templateUrl: './page-navigator.component.html',
  styleUrls: ['./page-navigator.component.scss']
})
export class PageNavigatorComponent implements OnInit {

  @Input() headerTitle: string;
  @Input() background = 'assets/images/page-header.jpg';
  @Input() menus: IPageNavMenu[] = [];
  @Input() breadcrumbs: Array<string[]> = [];

  constructor(private router: Router,
              private title: Title) {
  }

  get pageTitle(): string {
    const url = this.router.url.split('?')[0];
    const menu = this.menus.find(m => url.startsWith(m.link));
    if (menu) {
      return menu.name;
    }
    return '';
  }

  get breadcrumbItems(): string[] {
    return this.breadcrumbs.find(items => {
      const length = items.length;
      if (length > 0) {
        return items[length - 1] === this.pageTitle;
      }
      return false;
    }) || [];
  }

  ngOnInit(): void {
    this.title.setTitle(`${environment.baseTitle} - ${this.pageTitle}`);
  }

}
