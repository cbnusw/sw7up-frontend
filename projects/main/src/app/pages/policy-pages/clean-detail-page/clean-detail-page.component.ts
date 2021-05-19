import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CorruptionReportService, ICorruptionReport, PlatformService } from 'shared';
import { URLS } from '../../../constants/urls';

@Component({
  selector: 'sw-clean-detail-page',
  templateUrl: './clean-detail-page.component.html',
  styleUrls: ['./clean-detail-page.component.scss']
})
export class CleanDetailPageComponent implements OnInit, OnDestroy {

  private _subscription: Subscription;

  readonly CLEAN_URL = URLS.POLICY.CLEAN;

  report: ICorruptionReport;
  content: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private platform: PlatformService,
              private corruptionReportService: CorruptionReportService) {
  }

  writeReply(): void {
    this.corruptionReportService.addReply(this.report._id, this.content).pipe(
      switchMap(() => this.corruptionReportService.getCorruptionReport(this.report._id))
    ).subscribe(
      res => this.report = res.data
    );
  }

  ngOnInit(): void {
    this._subscription = this.route.params.pipe(
      map(params => params.id),
      switchMap(id => this.corruptionReportService.getCorruptionReport(id))
    ).subscribe(
      res => this.report = res.data,
      err => {
        if (this.platform.isBrowser) {
          let message;
          if (err.status === 403) {
            message = '권한이 없는 요청입니다.';
          } else if (err.status === 404) {
            message = '찾을 수 없는 신고입니다.';
          } else {
            message = err.error && err.error.message || err.message;
          }
          alert(message);
          this.router.navigateByUrl(this.CLEAN_URL);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
