import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AbstractSearchDirective, GalleryService, IGallery, IListResponse, IParams } from 'shared';
import { URLS } from '../../../constants/urls';

@Component({
  selector: 'sw-gallery-list-page',
  templateUrl: './gallery-list-page.component.html',
  styleUrls: ['./gallery-list-page.component.scss']
})
export class GalleryListPageComponent extends AbstractSearchDirective<IGallery> {

  readonly GLLERY_URL = URLS.COMMUNITY.GALLERY;

  constructor(private galleryService: GalleryService,
              route: ActivatedRoute,
              router: Router) {
    super({ limit: 10, sort: '-createdAt' }, ['title', 'writer'], route, router);
  }

  protected requestObservable(params: IParams | undefined): Observable<IListResponse<IGallery>> {
    return this.galleryService.search(params);
  }
}
