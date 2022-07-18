import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { IListResponse } from 'projects/shared/src/public-api';
import { Observable } from 'rxjs';
import { AbstractSearchDirective, IParams, IStudentActivity, StudentActivityService } from 'shared';
import { LayoutService } from 'ui';

@Component({
  selector: 'sw-student-activity-list-page',
  templateUrl: './student-activity-list-page.component.html',
  styleUrls: ['./student-activity-list-page.component.scss']
})
export class StudentActivityListPageComponent extends AbstractSearchDirective<IStudentActivity> implements AfterViewInit {

  columns: string[] = ['no', 'title', 'hits', 'writer', 'createdAt'];
  limitOptions: number[] = [15, 30, 50, 100];
  @ViewChild(MatSort) sort: MatSort;

  constructor(public layout: LayoutService,
              private studentActivityService: StudentActivityService,
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

  protected requestObservable(params: IParams | undefined): Observable<IListResponse<IStudentActivity>> {
    return this.studentActivityService.search(params);
  }
}
