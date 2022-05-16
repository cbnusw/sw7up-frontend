import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AbstractSearchDirective, IListResponse, INewsletter, IParams, NewsletterService } from 'shared';
import { URLS } from '../../../constants/urls';

@Component({
  selector: 'sw-newsletter-list-page',
  templateUrl: './newsletter-list-page.component.html',
  styleUrls: ['./newsletter-list-page.component.scss']
})
export class NewsletterListPageComponent extends AbstractSearchDirective<INewsletter> {

  readonly NEWSLETTER_URL = URLS.COMMUNITY.NEWSLETTER;

  constructor(private newsletterService: NewsletterService,
              route: ActivatedRoute,
              router: Router) {
    super({ limit: 10, sort: '-yearMonth' }, ['title', 'writer', 'yearMonth'], route, router);
  }

  protected requestObservable(params: IParams | undefined): Observable<IListResponse<INewsletter>> {
    return this.newsletterService.search(params);
  }
}
