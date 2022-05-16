import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AbstractSearchDirective, IListResponse, IOverseasEducation, IParams, OverseasEducationService } from 'shared';
import { LayoutService } from 'ui';

@Component({
  selector: 'sw-overseas-education-list-page',
  templateUrl: './overseas-education-list-page.component.html',
  styleUrls: ['./overseas-education-list-page.component.scss']
})
export class OverseasEducationListPageComponent extends AbstractSearchDirective<IOverseasEducation> implements AfterViewInit {

  columns: string[] = ['no', 'title', 'hits', 'writer', 'createdAt'];
  limitOptions: number[] = [15, 30, 50, 100];
  @ViewChild(MatSort) sort: MatSort;

  constructor(public layout: LayoutService,
              private overseasEducationService: OverseasEducationService,
              route: ActivatedRoute,
              router: Router) {
    super({ limit: 30, sort: '-createdAt' }, ['title', 'writer'], route, router);
  }

  changePage(event: PageEvent): void {
    this.limit = event.pageSize;
    super.pagination(event.pageIndex + 1);
  }

  ngAfterViewInit(): void {
    this.addSubscriptions(
      this.sort.sortChange.subscribe(event => {
        this.params.sort = `${event.direction === 'asc' ? '' : '-'}${event.active}`;
        this.search(this.page);
      })
    );
  }

  protected requestObservable(params: IParams | undefined): Observable<IListResponse<IOverseasEducation>> {
    return this.overseasEducationService.search(params);
  }

}
