import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { NoticeService, PressReleaseService } from 'shared';
import { IArticle } from '../components/article-list/article-list.component';

@Component({
  selector: 'sw-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  notices$: Observable<IArticle[]>;

  pressReleases$: Observable<IArticle[]>;

  constructor(noticeService: NoticeService,
              pressReleaseService: PressReleaseService) {

    this.notices$ = noticeService.search({ page: 1, limit: 5, sort: '-createdAt' })
      .pipe(map(res => res.data.documents));

    this.pressReleases$ = pressReleaseService.search({ page: 1, limit: 5, sort: '-createdAt' })
      .pipe(map(res => res.data.documents));
  }

  ngOnInit(): void {
  }
}
