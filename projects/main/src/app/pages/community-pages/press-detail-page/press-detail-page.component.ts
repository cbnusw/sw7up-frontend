import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IPressRelease, PlatformService, PressReleaseService } from 'shared';
import { URLS } from '../../../constants/urls';

@Component({
  selector: 'sw-press-detail-page',
  templateUrl: './press-detail-page.component.html',
  styleUrls: ['./press-detail-page.component.scss']
})
export class PressDetailPageComponent implements OnInit, OnDestroy {

  private _subscription: Subscription;
  readonly PRESS_RELEASE_LIST_URL = URLS.COMMUNITY.PRESS;

  pressRelease: IPressRelease;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private platform: PlatformService,
              private pressReleaseService: PressReleaseService) {
  }

  ngOnInit(): void {
    this._subscription = this.route.params.pipe(
      map(params => params.id),
      switchMap(id => this.pressReleaseService.getPressRelease(id))
    ).subscribe(
      res => this.pressRelease = res.data,
      err => {
        if (this.platform.isBrowser) {
          const message = err.status === 404 ? '찾을 수 없는 보도자료입니다.' : err.error && err.error.message || err.message;
          alert(message);
          this.router.navigateByUrl(this.PRESS_RELEASE_LIST_URL);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}
