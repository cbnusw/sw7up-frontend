import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AbstractSearchDirective, IListResponse, INotice, IParams, NOTICE_CATEGORIES, NoticeService, TNoticeCategory } from 'shared';
import { URLS } from '../../../constants/urls';
import { ISelectOption } from '../../../models/select-option';


@Component({
  selector: 'sw-notice-list-page',
  templateUrl: './notice-list-page.component.html',
  styleUrls: ['./notice-list-page.component.scss']
})
export class NoticeListPageComponent extends AbstractSearchDirective<INotice> {

  NOTICE_URL = URLS.COMMUNITY.NOTICE;

  categoryOptions: ISelectOption<TNoticeCategory, TNoticeCategory>[];

  constructor(private noticeService: NoticeService,
              route: ActivatedRoute,
              router: Router) {
    super({ limit: 10, sort: '-createdAt' }, ['title', 'writer'], route, router);
    this.categoryOptions = [{ viewValue: '전체', value: '' }, ...NOTICE_CATEGORIES.map(c => ({ viewValue: c, value: c }))];
  }

  changeCategory(value: string): void {
    if (value) {
      this.params.category = value;
    } else {
      delete this.params.category;
    }
    this.search(1);
  }

  isImportant(notice?: INotice): boolean {
    const now = new Date();
    if (notice.important) {
      const period = notice.period;
      return period ? new Date(period).getTime() >= now.getTime() : false;
    }
    return false;
  }

  protected requestObservable(params: IParams): Observable<IListResponse<INotice>> {
    return this.noticeService.search(params);
  }
}
