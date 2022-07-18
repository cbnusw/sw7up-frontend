import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IStudentActivity, PlatformService, StudentActivityService } from 'shared';
import { URLS } from '../../../constants/urls';

@Component({
  selector: 'sw-student-activity-detail-page',
  templateUrl: './student-activity-detail-page.component.html',
  styleUrls: ['./student-activity-detail-page.component.scss']
})
export class StudentActivityDetailPageComponent implements OnInit, OnDestroy {

  private _subscription: Subscription;
  readonly STUDENT_ACTIVITY_URL = URLS.COMMUNITY.STUDENT_ACTIVITY;

  document: IStudentActivity;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private platform: PlatformService,
              private studentActivityService: StudentActivityService) {
  }

  ngOnInit(): void {
    this._subscription = this.route.params.pipe(
      map(params => params.id),
      switchMap(id => this.studentActivityService.getStudentActivity(id))
    ).subscribe(
      res => this.document = res.data,
      err => {
        if (this.platform.isBrowser) {
          const message = err.status === 404 ? '찾을 수 없는 자료입니다.' : err.error?.message || err.message;
          alert(message);
          this.router.navigateByUrl(this.STUDENT_ACTIVITY_URL);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }

}
