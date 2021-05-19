import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AbstractSearchDirective, CorruptionReportService, ICorruptionReport, IListResponse, IParams } from 'shared';
import { URLS } from '../../../constants/urls';

@Component({
  selector: 'sw-my-clean-list-page',
  templateUrl: './my-clean-list-page.component.html',
  styleUrls: ['./my-clean-list-page.component.scss']
})
export class MyCleanListPageComponent extends AbstractSearchDirective<ICorruptionReport> {

  readonly CLEAN_URL = URLS.POLICY.CLEAN;

  constructor(private corruptionReportService: CorruptionReportService,
              route: ActivatedRoute,
              router: Router) {
    super({ limit: 10, sort: '-createdAt' }, ['title'], route, router);
  }

  protected requestObservable(params: IParams | undefined): Observable<IListResponse<ICorruptionReport>> {
    return this.corruptionReportService.search(params);
  }

}
