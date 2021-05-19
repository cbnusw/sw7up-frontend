import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AbstractSearchDirective, GalleryService, IGallery, IListResponse, IParams } from 'shared';
import { LayoutService } from 'ui';

@Component({
  selector: 'sw-gallery-list-page',
  templateUrl: './gallery-list-page.component.html',
  styleUrls: ['./gallery-list-page.component.scss']
})
export class GalleryListPageComponent extends AbstractSearchDirective<IGallery> implements AfterViewInit {

  columns: string[] = ['no', 'title', 'hits', 'writer', 'createdAt'];
  limitOptions: number[] = [15, 30, 50, 100];

  @ViewChild(MatSort) sort: MatSort;

  constructor(public layout: LayoutService,
              private galleryService: GalleryService,
              route: ActivatedRoute,
              router: Router) {
    super({ limit: 30, sort: '-createdAt' }, ['title', 'writer'], route, router);
  }

  changePage(event: PageEvent): void {
    this.limit = event.pageSize;
    super.pagination(event.pageIndex + 1);
  }

  protected requestObservable(params: IParams | undefined): Observable<IListResponse<IGallery>> {
    return this.galleryService.search(params);
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
