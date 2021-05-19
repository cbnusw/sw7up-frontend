import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AbstractSearchDirective, IListResponse, IParams, IPressRelease, PressReleaseService } from 'shared';
import { LayoutService } from 'ui';

@Component({
  selector: 'sw-press-release-list-page',
  templateUrl: './press-release-list-page.component.html',
  styleUrls: ['./press-release-list-page.component.scss']
})
export class PressReleaseListPageComponent extends AbstractSearchDirective<IPressRelease> implements AfterViewInit {

  columns: string[] = ['no', 'title', 'hits', 'writer', 'createdAt'];
  limitOptions: number[] = [15, 30, 50, 100];

  @ViewChild(MatSort) sort: MatSort;

  constructor(public layout: LayoutService,
              private pressReleaseService: PressReleaseService,
              route: ActivatedRoute,
              router: Router) {
    super({ limit: 30, sort: '-createdAt' }, [ 'title', 'writer', 'createdAt' ], route, router);
  }

  changePage(event: PageEvent): void {
    this.limit = event.pageSize;
    super.pagination(event.pageIndex + 1);
  }

  protected requestObservable(params: IParams | undefined): Observable<IListResponse<IPressRelease>> {
    return this.pressReleaseService.search(params);
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
