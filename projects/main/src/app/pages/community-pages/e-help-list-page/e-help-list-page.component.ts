import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AbstractSearchDirective, AuthService, E_HELP_CATEGORIES, IListResponse, IParams, IQna, QnaService, TEHelpCategory } from 'shared';
import { URLS } from '../../../constants/urls';

@Component({
  selector: 'sw-e-help-list-page',
  templateUrl: './e-help-list-page.component.html',
  styleUrls: ['./e-help-list-page.component.scss']
})
export class EHelpListPageComponent extends AbstractSearchDirective<IQna> {

  readonly E_HELP_URL = URLS.COMMUNITY.E_HELP;
  categoryOptions: TEHelpCategory[] = E_HELP_CATEGORIES;

  constructor(private qnaService: QnaService,
              private auth: AuthService,
              route: ActivatedRoute,
              router: Router) {
    super({ limit: 10, sort: '-createdAt' }, ['title', 'writer', 'writerInfo'], route, router);
  }

  changeCategory(category: string): void {
    if (category) {
      this.params.category = category;
    } else {
      delete this.params.category;
    }
    this.search(1);
  }

  protected requestObservable(params: IParams | undefined): Observable<IListResponse<IQna>> {
    return this.qnaService.search(params);
  }

  moveDetail(qna: IQna): boolean {
    if (!qna.confirm && qna.writer && !this.auth.loggedIn) {
      alert('이 질문은 열람할 수 없습니다.');
      return false;
    }
    this.router.navigate([this.E_HELP_URL, 'detail', qna._id]);
    return false;
  }
}
