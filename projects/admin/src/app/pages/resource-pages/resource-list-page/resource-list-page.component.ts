import { AfterViewInit, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AbstractSearchDirective, IListResponse, IParams, IResource, ResourceService } from 'shared';
import { LayoutService } from 'ui';

@Component({
  selector: 'sw-resource-list-page',
  templateUrl: './resource-list-page.component.html',
  styleUrls: ['./resource-list-page.component.scss']
})
export class ResourceListPageComponent extends AbstractSearchDirective<IResource> implements AfterViewInit {

  columns: string[] = ['no', 'title', 'writer', 'createdAt'];
  limitOptions: number[] = [15, 30, 50, 100];

  constructor(public layout: LayoutService,
              private resourceService: ResourceService,
              route: ActivatedRoute,
              router: Router) {
    super({ limit: 30, sort: '-createdAt' }, ['title', 'writer'], route, router);
  }

  changePage(event: PageEvent): void {
    this.limit = event.pageSize;
    super.pagination(event.pageIndex + 1);
  }

  protected requestObservable(params: IParams | undefined): Observable<IListResponse<IResource>> {
    return this.resourceService.search(params);
  }

  ngAfterViewInit(): void {
  }

}
