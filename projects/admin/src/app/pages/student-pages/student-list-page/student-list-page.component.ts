import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AbstractSearchDirective, IListResponse, IParams, IUserInfo, UserService } from 'shared';

@Component({
  selector: 'sw-student-list-page',
  templateUrl: './student-list-page.component.html',
  styleUrls: ['./student-list-page.component.scss']
})
export class StudentListPageComponent extends AbstractSearchDirective<IUserInfo> implements AfterViewInit {

  columns: Array<keyof IUserInfo> = ['no', 'name', 'department', 'email', 'phone', 'joinedAt'];
  limitOptions: number[] = [15, 30, 50, 100];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService,
              route: ActivatedRoute,
              router: Router) {
    super({ limit: 30 }, ['name', 'phone', 'email', 'no', 'department'], route, router);
  }

  changePage(event: PageEvent): void {
    this.limit = event.pageSize;
    super.pagination(event.pageIndex + 1);
  }

  protected requestObservable(params: IParams | undefined): Observable<IListResponse<IUserInfo>> {
    return this.userService.searchStudents(params);
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
