import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AbstractSearchDirective, IListResponse, INewsletter, IParams, NewsletterService } from 'shared';
import { LayoutService } from 'ui';

@Component({
  selector: 'sw-newsletter-list-page',
  templateUrl: './newsletter-list-page.component.html',
  styleUrls: ['./newsletter-list-page.component.scss']
})
export class NewsletterListPageComponent extends AbstractSearchDirective<INewsletter> implements AfterViewInit {

  columns: string[] = ['no', 'title', 'hits', 'writer', 'yearMonth'];
  limitOptions: number[] = [15, 30, 50, 100];
  @ViewChild(MatSort) sort: MatSort;

  constructor(public layout: LayoutService,
              private newletterService: NewsletterService,
              route: ActivatedRoute,
              router: Router) {
    super({ limit: 30, sort: '-yearMonth' }, ['title', 'writer'], route, router);
  }

  changePage(event: PageEvent): void {
    this.limit = event.pageSize;
    super.pagination(event.pageIndex + 1);
  }

  protected requestObservable(params: IParams | undefined): Observable<IListResponse<INewsletter>> {
    return this.newletterService.search(params);
  }

  ngAfterViewInit(): void {
    this.addSubscriptions(
      this.sort.sortChange
        .subscribe(event => {
          this.params.sort = `${event.direction === 'asc' ? '' : '-'}${event.active}`;
          this.search(this.page);
        })
    );
  }
}
