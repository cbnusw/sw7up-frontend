import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { INotice, NoticeService, PlatformService } from 'shared';
import { URLS } from '../../../constants/urls';

@Component({
  selector: 'sw-notice-detail-page',
  templateUrl: './notice-detail-page.component.html',
  styleUrls: ['./notice-detail-page.component.scss']
})
export class NoticeDetailPageComponent implements OnInit, OnDestroy {

  private _subscription: Subscription;
  readonly NOTICE_LIST_URL = URLS.COMMUNITY.NOTICE;

  notice: INotice;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private platform: PlatformService,
              private noticeService: NoticeService) {
  }

  get important(): boolean {
    if (this.notice && this.notice.important) {
      return this.notice.period ? new Date().getTime() <= new Date(this.notice.period).getTime() : false;
    }

    return false;
  }

  ngOnInit(): void {
    this._subscription = this.route.params.pipe(
      map(params => params.id),
      switchMap(id => this.noticeService.getNotice(id))
    ).subscribe(
      res => this.notice = res.data,
      err => {
        if (this.platform.isBrowser) {
          let message;
          switch (err.status) {
            case 403:
              message = '접근 권한이 없는 공지사항입니다.';
              break;
            case 404:
              message = '찾을 수 없는 공지사항입니다.';
              break;
            default:
              message = err.error ? err.error.message : err.message;
          }
          alert(message);
          this.router.navigateByUrl(this.NOTICE_LIST_URL);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}
