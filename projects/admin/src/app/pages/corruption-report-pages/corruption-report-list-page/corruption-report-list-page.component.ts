import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AbstractSearchDirective, CorruptionReportService, ICorruptionReport, IListResponse, IParams } from 'shared';

@Component({
  selector: 'sw-corruption-report-list-page',
  templateUrl: './corruption-report-list-page.component.html',
  styleUrls: ['./corruption-report-list-page.component.scss']
})
export class CorruptionReportListPageComponent extends AbstractSearchDirective<ICorruptionReport> implements AfterViewInit {

  columns: string[] = ['no', 'title', 'writer', 'createdAt', 'replies'];
  limitOptions: number[] = [15, 30, 50, 100];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private corruptionReportService: CorruptionReportService,
              route: ActivatedRoute,
              router: Router) {
    super({ limit: 30, sort: '-createdAt' }, ['title', 'writer'], route, router);
  }

  changePage(event: PageEvent): void {
    this.limit = event.pageSize;
    super.pagination(event.pageIndex + 1);
  }

  protected requestObservable(params: IParams | undefined): Observable<IListResponse<ICorruptionReport>> {
    return this.corruptionReportService.search(params);
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
