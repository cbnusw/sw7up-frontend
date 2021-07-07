import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AbstractSearchDirective, IListResponse, IParams, IPressRelease, PressReleaseService } from 'shared';
import { URLS } from '../../../constants/urls';

@Component({
  selector: 'sw-press-list-page',
  templateUrl: './press-list-page.component.html',
  styleUrls: ['./press-list-page.component.scss']
})
export class PressListPageComponent extends AbstractSearchDirective<IPressRelease> {

  readonly PRESS_URL = URLS.COMMUNITY.PRESS;

  constructor(private pressReleaseService: PressReleaseService,
              route: ActivatedRoute,
              router: Router) {
    super({ limit: 10, sort: '-createdAt' }, ['title', 'writer'], route, router);
  }

  protected requestObservable(params: IParams | undefined): Observable<IListResponse<IPressRelease>> {
    return this.pressReleaseService.search(params);
  }
}
