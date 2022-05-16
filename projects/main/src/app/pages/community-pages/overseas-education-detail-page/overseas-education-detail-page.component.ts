import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IOverseasEducation, OverseasEducationService, PlatformService } from 'shared';
import { URLS } from '../../../constants/urls';

@Component({
  selector: 'sw-overseas-education-detail-page',
  templateUrl: './overseas-education-detail-page.component.html',
  styleUrls: ['./overseas-education-detail-page.component.scss']
})
export class OverseasEducationDetailPageComponent implements OnInit, OnDestroy {

  private _subscription: Subscription;
  readonly OVERSEAS_URL = URLS.COMMUNITY.OVERSEAS;

  document: IOverseasEducation;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private platform: PlatformService,
              private overseasEducationService: OverseasEducationService) {
  }

  ngOnInit(): void {
    this._subscription = this.route.params.pipe(
      map(params => params.id),
      switchMap(id => this.overseasEducationService.getOverseasEducation(id))
    ).subscribe(
      res => this.document = res.data,
      err => {
        if (this.platform.isBrowser) {
          const message = err.status === 404 ? '찾을 수 없는 자료입니다.' : err.error?.message || err.message;
          alert(message);
          this.router.navigateByUrl(this.OVERSEAS_URL);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}
