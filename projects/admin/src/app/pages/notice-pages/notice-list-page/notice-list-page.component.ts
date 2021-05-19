import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AbstractSearchDirective, IListResponse, INotice, IParams, NoticeService } from 'shared';
import { LayoutService } from 'ui';

@Component({
  selector: 'sw-notice-list-page',
  templateUrl: './notice-list-page.component.html',
  styleUrls: ['./notice-list-page.component.scss']
})
export class NoticeListPageComponent extends AbstractSearchDirective<INotice> implements AfterViewInit {

  columns: string[] = ['no', 'title', 'category', 'hits', 'writer', 'createdAt', 'period'];
  limitOptions: number[] = [15, 30, 50, 100];
  @ViewChild(MatSort) sort: MatSort;

  constructor(public layout: LayoutService,
              private noticeService: NoticeService,
              route: ActivatedRoute,
              router: Router) {
    super({ limit: 30, sort: '-createdAt' }, ['category', 'title', 'writer'], route, router);
  }

  important(notice: INotice): boolean {
    if (notice.important && notice.period) {
      const now = new Date();
      const period = new Date(notice.period);
      return now.getTime() <= period.getTime();
    }
    return false;
  }

  changePage(event: PageEvent): void {
    this.limit = event.pageSize;
    super.pagination(event.pageIndex + 1);
  }

  protected requestObservable(params: IParams | undefined): Observable<IListResponse<INotice>> {
    return this.noticeService.search(params);
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
