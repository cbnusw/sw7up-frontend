import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AbstractSearchDirective, IListResponse, IParams, IUserInfo, UserService } from 'shared';

@Component({
  selector: 'sw-operator-list-page',
  templateUrl: './operator-list-page.component.html',
  styleUrls: ['./operator-list-page.component.scss']
})
export class OperatorListPageComponent extends AbstractSearchDirective<IUserInfo> implements AfterViewInit {

  columns: Array<keyof IUserInfo> = ['no', 'name', 'position', 'department', 'center', 'email', 'phone', 'joinedAt'];
  limitOptions: number[] = [15, 30, 50, 100];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService,
              route: ActivatedRoute,
              router: Router) {
    super({ limit: 30 }, ['name', 'phone', 'email', 'no'], route, router);
  }

  changePage(event: PageEvent): void {
    this.limit = event.pageSize;
    super.pagination(event.pageIndex + 1);
  }

  protected requestObservable(params: IParams | undefined): Observable<IListResponse<IUserInfo>> {
    return this.userService.searchOperators(params);
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
