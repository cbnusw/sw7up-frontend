import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { INewsletter, NewsletterService } from 'shared';

@Component({
  selector: 'sw-newsletter-detail-page',
  templateUrl: './newsletter-detail-page.component.html',
  styleUrls: ['./newsletter-detail-page.component.scss']
})
export class NewsletterDetailPageComponent implements OnInit, OnDestroy {

  private _subscription: Subscription;

  newsletter: INewsletter;

  constructor(private newsletterService: NewsletterService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  removeNewsletter(): void {
    const yes = confirm('뉴스레터를 삭제하시겠습니까?');

    if (yes) {
      this.newsletterService.removeNewsletter(this.newsletter._id).subscribe(
        () => {
          alert('뉴스레터를 삭제하였습니다.');
          this.router.navigateByUrl('/newsletter/list');
        },
        err => alert(`${err.error && err.error.message || err.message}`)
      );
    }
  }

  ngOnInit(): void {
    this._subscription = this.route.params.pipe(
      map(params => params.id),
      switchMap(id => this.newsletterService.getNewsletter(id))
    ).subscribe(
      res => this.newsletter = res.data,
      err => {
      }
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
