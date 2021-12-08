import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlatformService } from 'shared';

@Component({
  selector: 'sw-internship-e-book-page',
  templateUrl: './internship-e-book-page.component.html',
  styleUrls: ['./internship-e-book-page.component.scss']
})
export class InternshipEBookPageComponent implements OnInit, OnDestroy {

  url: SafeResourceUrl;

  private subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private platform: PlatformService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.subscription = this.route.queryParams.pipe(
      map(params => params.url)
    ).subscribe(url => this.url = (this.sanitizer.bypassSecurityTrustResourceUrl(url)));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
