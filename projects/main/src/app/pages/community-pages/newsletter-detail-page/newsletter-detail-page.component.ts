import { Platform } from '@angular/cdk/platform';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { INewsletter, NewsletterService, PlatformService } from 'shared';
import { URLS } from '../../../constants/urls';

@Component({
  selector: 'sw-newsletter-detail-page',
  templateUrl: './newsletter-detail-page.component.html',
  styleUrls: ['./newsletter-detail-page.component.scss']
})
export class NewsletterDetailPageComponent implements OnInit, OnDestroy {

  private _subscription: Subscription;

  readonly NEWSLETTER_URL = URLS.COMMUNITY.NEWSLETTER;

  newsletter: INewsletter;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private platform: PlatformService,
              private newsletterService: NewsletterService) {
  }

  ngOnInit(): void {
    this._subscription = this.route.params.pipe(
      map(params => params.id),
      switchMap(id => this.newsletterService.getNewsletter(id))
    ).subscribe(
      res => this.newsletter = res.data,
      err => {
        if (this.platform.isBrowser) {
          const message = err.status === 404 ? '찾을 수 없는 갤러리입니다.' : err.error && err.error.message || err.message;
          alert(message);
          this.router.navigateByUrl(this.NEWSLETTER_URL);
        }
      });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}
