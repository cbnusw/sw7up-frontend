import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AbstractSearchDirective, IListResponse, IOverseasEducation, IParams, OverseasEducationService } from 'shared';
import { URLS } from '../../../constants/urls';

@Component({
  selector: 'sw-overseas-education-list-page',
  templateUrl: './overseas-education-list-page.component.html',
  styleUrls: ['./overseas-education-list-page.component.scss']
})
export class OverseasEducationListPageComponent extends AbstractSearchDirective<IOverseasEducation> {

  readonly OVERSEAS_URL = URLS.COMMUNITY.OVERSEAS;

  constructor(private overseasEducationService: OverseasEducationService,
              route: ActivatedRoute,
              router: Router) {
    super({ limit: 10, sort: '-createdAt' }, ['title', 'writer'], route, router);
  }

  protected requestObservable(params: IParams | undefined): Observable<IListResponse<IOverseasEducation>> {
    return this.overseasEducationService.search(params);
  }
}
