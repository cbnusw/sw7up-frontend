import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { CorruptionReportService, ICorruptionReport } from 'shared';

@Component({
  selector: 'sw-corruption-report-detail-page',
  templateUrl: './corruption-report-detail-page.component.html',
  styleUrls: ['./corruption-report-detail-page.component.scss']
})
export class CorruptionReportDetailPageComponent implements OnInit, OnDestroy {

  private _subscription: Subscription;

  report: ICorruptionReport;
  content: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private corruptionReportService: CorruptionReportService) {
  }

  writeReply(): void {
    if (this.content) {
      this.corruptionReportService.addReply(this.report._id, this.content).pipe(
        switchMap(() => this.corruptionReportService.getCorruptionReport(this.report._id))
      ).subscribe(
        res => {
          this.report = res.data;
          this.content = null;
        },
        err => alert(`${err.error && err.error.message || err.message}`)
      );
    } else {
      alert('답글을 작성해주세요.');
    }
  }

  ngOnInit(): void {
    this._subscription = this.route.params.pipe(
      map(params => params.id),
      switchMap(id => this.corruptionReportService.getCorruptionReport(id)),
    ).subscribe(
      res => this.report = res.data,
      err => {
        const message = err.status === 404 ? '찾을 수 없는 신고입니다.' : err.error && err.error.message || err.message;
        alert(message);
        this.router.navigateByUrl('/corruption-report/list');
      }
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
