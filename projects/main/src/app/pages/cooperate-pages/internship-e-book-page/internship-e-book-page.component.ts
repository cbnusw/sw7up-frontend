import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlatformService } from 'shared';
import { URLS } from '../../../constants/urls';

@Component({
  selector: 'sw-internship-e-book-page',
  templateUrl: './internship-e-book-page.component.html',
  styleUrls: ['./internship-e-book-page.component.scss']
})
export class InternshipEBookPageComponent implements OnInit, OnDestroy {

  url: SafeResourceUrl;

  private subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private platform: PlatformService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.subscription = this.route.queryParams.pipe(
      map(params => params.url)
    ).subscribe(url => {
      if (!url.startsWith('assets/pdfs/internships')) {
        this.router.navigateByUrl(URLS.COOPERATE.INTERNSHIP);
        return;
      }
      this.url = (this.sanitizer.bypassSecurityTrustResourceUrl(url));
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
