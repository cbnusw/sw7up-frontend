import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AbstractSearchDirective, IListResponse, IParams, IResource, ResourceService } from 'shared';
import { URLS } from '../../../constants/urls';

@Component({
  selector: 'sw-archive-list-page',
  templateUrl: './archive-list-page.component.html',
  styleUrls: ['./archive-list-page.component.scss']
})
export class ArchiveListPageComponent extends AbstractSearchDirective<IResource> {

  readonly ARCHIVE_URL = URLS.COMMUNITY.ARCHIVE;

  constructor(private resourceService: ResourceService,
              route: ActivatedRoute,
              router: Router) {
    super({ limit: 10, sort: '-createdAt' }, ['title', 'writer'], route, router);
  }

  protected requestObservable(params: IParams | undefined): Observable<IListResponse<IResource>> {
    return this.resourceService.search(params);
  }
}
