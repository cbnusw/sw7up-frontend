import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AbstractSearchDirective, IListResponse, IParams, IQna, QnaService } from 'shared';
import { LayoutService } from 'ui';

@Component({
  selector: 'sw-qna-list-page',
  templateUrl: './qna-list-page.component.html',
  styleUrls: ['./qna-list-page.component.scss']
})
export class QnaListPageComponent extends AbstractSearchDirective<IQna> implements AfterViewInit {

  columns: string[] = ['no', 'category', 'title', 'department', 'writer', 'createdAt'];
  limitOptions: number[] = [15, 30, 50, 100];

  @ViewChild(MatSort) sort: MatSort;

  constructor(public layout: LayoutService,
              private qnaService: QnaService,
              route: ActivatedRoute,
              router: Router) {
    super(
      { limit: 30, sort: '-createdAt' },
      ['category', 'title', 'writer', 'writerInfo.name'],
      route,
      router
    );
  }

  changePage(event: PageEvent): void {
    this.limit = event.pageSize;
    super.pagination(event.pageIndex + 1);
  }

  protected requestObservable(params: IParams | undefined): Observable<IListResponse<IQna>> {
    return this.qnaService.search(params);
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
